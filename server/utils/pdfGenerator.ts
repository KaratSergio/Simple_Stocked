import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { r2 } from "@/server/config/r2.config";
import { GetObjectCommand } from "@aws-sdk/client-s3";

async function fetchPdfFromS3(url: string): Promise<Uint8Array> {
    // url = https://bucket.r2.cloudflarestorage.com/key.pdf
    const key = url.split(".com/")[1]; // get 'documents/123456.pdf'
    const res = await r2.send(new GetObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: key }));
    const chunks: Uint8Array[] = [];
    for await (const chunk of res.Body as any) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}

export async function generatePdf(schema: any, values: any, pdfBase?: string): Promise<Uint8Array> {
    let pdfDoc: PDFDocument;

    if (pdfBase) {
        const existingPdfBytes = await fetchPdfFromS3(pdfBase);
        pdfDoc = await PDFDocument.load(existingPdfBytes);
    } else {
        pdfDoc = await PDFDocument.create();
        pdfDoc.addPage([595.28, 841.89]); // A4
    }

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    for (const field of schema.elements) {
        const value = values[field.id] || "";
        if (field.type === "text" || field.type === "textarea") {
            firstPage.drawText(value, {
                x: field.x || 50,
                y: (schema.pageHeight - (field.y || 50)), // reverse 
                size: field.size || 12,
                font,
                color: rgb(0, 0, 0),
                maxWidth: field.width || 200,
            });
        }
        if (field.type === "signature") {
            firstPage.drawText("[Signature]", {
                x: field.x || 50,
                y: (schema.pageHeight - (field.y || 50)),
                size: 14,
                font,
                color: rgb(0, 0, 1),
            });
        }
    }

    return pdfDoc.save();
}

