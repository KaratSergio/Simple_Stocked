import * as signatureRepo from "@/server/data/repo/signature.repository";
import * as documentRepo from "@/server/data/repo/document.repository";
import * as templateRepo from "@/server/data/repo/template.repository";
import { Signature } from "@/server/types/signature.types";
import { generatePdf } from "../utils/pdfGenerator";
import { uploadPdf } from "../utils/s3Storage";

export async function addSignature(
    documentId: number,
    recipientId: number,
    signatureData: string
): Promise<Signature> {
    console.log("[addSignature] called", { documentId, recipientId });

    if (!documentId) throw new Error("Document ID is required");
    if (!recipientId) throw new Error("Recipient ID is required");
    if (!signatureData) throw new Error("Signature data is required");

    // 1. Сохраняем подпись
    const signature = await signatureRepo.addSignature(documentId, recipientId, signatureData);

    // 2. Получаем документ
    const doc = await documentRepo.getDocumentById(documentId);
    if (!doc) throw new Error("Document not found");

    // 3. Обновляем values.recipients
    const updatedValues = { ...doc.values };

    console.log("[addSignature] Before update:", JSON.stringify(updatedValues.recipients, null, 2));

    if (Array.isArray(updatedValues.recipients)) {
        updatedValues.recipients = updatedValues.recipients.map((r: any) =>
            r.id === recipientId
                ? { ...r, signature: signatureData, signed_at: new Date().toISOString() }
                : r
        );
    }

    console.log("[addSignature] After update:", JSON.stringify(updatedValues.recipients, null, 2));

    // 4. Берём шаблон
    const template = await templateRepo.getTemplateById(doc.template_id);
    if (!template) throw new Error("Template not found");

    // 5. Генерируем новый PDF
    const pdfBytes = await generatePdf(template.json_schema, updatedValues, template.pdf_base);

    // 6. Загружаем в S3
    const oldUrl = doc.pdf_generated ?? "";
    const key = oldUrl.replace(
        `https://${process.env.S3_BUCKET}.r2.cloudflarestorage.com/`,
        ""
    );
    const pdfUrl = await uploadPdf(pdfBytes, key);

    // 7. Определяем статус
    let newStatus: "pending" | "signed" = "signed";
    if (
        Array.isArray(updatedValues.recipients) &&
        updatedValues.recipients.some((r: any) => !r.signature)
    ) {
        newStatus = "pending";
    }

    // 8. Обновляем документ
    await documentRepo.updateDocument(documentId, newStatus, pdfUrl, updatedValues);

    return signature;
}


export async function listSignatures(documentId: number): Promise<Signature[]> {
    if (!documentId) throw new Error("Document ID is required");
    return signatureRepo.listSignaturesByDocument(documentId);
}
