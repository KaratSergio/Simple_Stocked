import * as signatureRepo from "@/server/data/repo/signature.repository";
import * as documentRepo from "@/server/data/repo/document.repository";
import * as templateRepo from "@/server/data/repo/template.repository";
import { Signature } from "@/server/types/signature.types";
import { generatePdf } from "../utils/pdfGenerator";
import { uploadPdf } from "../utils/s3Storage";

export async function addSignature(
    documentId: string,
    recipientId: number,
    signatureData: string
): Promise<Signature> {
    console.log("[addSignature] called", { documentId, recipientId });

    if (!documentId) throw new Error("Document ID is required");
    if (!recipientId) throw new Error("Recipient ID is required");
    if (!signatureData) throw new Error("Signature data is required");

    // 1. Сохраняем подпись
    const signature = await signatureRepo.addSignature(documentId, recipientId, signatureData);
    console.log("[addSignature] Signature saved", signature);

    // 2. Получаем документ
    const doc = await documentRepo.getDocumentById(documentId);
    console.log("[addSignature] Document fetched", doc);
    if (!doc) throw new Error("Document not found");

    // 3. Обновляем values
    const updatedValues = { ...doc.values };
    if (Array.isArray(updatedValues.recipients)) {
        updatedValues.recipients = updatedValues.recipients.map((r: any) =>
            r.id === recipientId ? { ...r, signature: signatureData } : r
        );
    }
    console.log("[addSignature] Updated values", updatedValues);

    // 4. Берём схему из шаблона
    const template = await templateRepo.getTemplateById(doc.template_id);
    console.log("[addSignature] Template fetched", template);
    if (!template) throw new Error("Template not found");

    // 5. Генерируем PDF
    const pdfBytes = await generatePdf(template.json_schema, updatedValues, template.pdf_base);
    console.log("[addSignature] PDF generated, bytes length:", pdfBytes.length);

    // 6. Перезаписываем PDF в S3 по старому ключу
    const oldUrl = doc.pdf_generated;
    const key = oldUrl?.replace(`https://${process.env.S3_BUCKET}.r2.cloudflarestorage.com/`, "");
    const pdfUrl = await uploadPdf(pdfBytes, key);
    console.log("[addSignature] PDF uploaded", { pdfUrl, key });

    // 7. Обновляем документ
    await documentRepo.updateDocumentStatus(documentId, "signed", pdfUrl, updatedValues);
    console.log("[addSignature] Document updated");

    return signature;
}

export async function listSignatures(documentId: string): Promise<Signature[]> {
    if (!documentId) throw new Error("Document ID is required");
    return signatureRepo.listSignaturesByDocument(documentId);
}
