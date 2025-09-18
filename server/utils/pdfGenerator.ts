import { PDFDocument, rgb } from "pdf-lib";
import { r2 } from "@/server/config/r2.config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import fontkit from "@pdf-lib/fontkit";

export interface Recipient {
    name: string;
    signature?: string | null; // base64 canvas signatures
}

// ============================
// Utility: Wrap text into lines
// ============================
function wrapText(text: string, font: any, fontSize: number, maxWidth: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";

    for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(testLine, fontSize) > maxWidth) {
            if (line) lines.push(line);
            line = word;
        } else {
            line = testLine;
        }
    }

    if (line) lines.push(line);
    return lines;
}

// ============================
// Fetch font from R2
// ============================
async function fetchFont(fontKey: string): Promise<Uint8Array> {
    const res = await r2.send(new GetObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: fontKey }));
    const chunks: Uint8Array[] = [];
    for await (const chunk of res.Body as any) chunks.push(chunk);
    return Buffer.concat(chunks);
}

// ============================
// Fetch base PDF from R2
// ============================
async function fetchPdfFromR2(key: string): Promise<Uint8Array> {
    const res = await r2.send(new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
    }));
    const chunks: Uint8Array[] = [];
    for await (const chunk of res.Body as any) chunks.push(chunk);
    return Buffer.concat(chunks);
}

// ============================
// Generate PDF with text and horizontal recipients
// ============================
export async function generatePdf(
    schema: any,
    values: { textarea_1: string; recipients: Recipient[] },
    pdfBase?: string
): Promise<Uint8Array> {

    // ============================
    // Load base PDF or create new
    // ============================
    let pdfDoc: PDFDocument;
    if (pdfBase) {
        const basePdfBytes = await fetchPdfFromR2(pdfBase.replace(/^.*\/([^\/]+)$/, '$1'));
        pdfDoc = await PDFDocument.load(basePdfBytes);
    } else {
        pdfDoc = await PDFDocument.create();
    }
    pdfDoc.registerFontkit(fontkit);

    // ============================
    // Embed font
    // ============================
    const fontBytes = await fetchFont("DejaVuSans.ttf");
    const font = await pdfDoc.embedFont(fontBytes);

    // ============================
    // Page settings
    // ============================
    const pageWidth = schema.pageWidth || 595;
    const pageHeight = schema.pageHeight || 842;
    const margin = 50;
    const fontSize = 12;
    const lineSpacing = 4;
    const maxWidth = pageWidth - 2 * margin;

    // ============================
    // Signature settings
    // ============================
    const sigHeight = 60;       // height of signature block
    const sigWidth = 150;       // signature image width
    const sigSpacing = 50;      // horizontal spacing between recipient blocks
    const sigNameOffset = 65;   // distance from name to signature image

    // ============================
    // Render text into pages
    // ============================
    const text = values.textarea_1 || "";
    const paragraphs = text.split("\n");

    let currentPage = pdfDoc.getPages()[0] || pdfDoc.addPage([pageWidth, pageHeight]);
    let currentY = pageHeight - margin;

    for (const para of paragraphs) {
        const lines = wrapText(para, font, fontSize, maxWidth);

        for (const line of lines) {
            // Check if there is enough space for text + signature block at bottom
            if (currentY - fontSize < margin + sigHeight + 10) {
                currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                currentY = pageHeight - margin;
            }
            currentPage.drawText(line, { x: margin, y: currentY, size: fontSize, font, color: rgb(0, 0, 0) });
            currentY -= fontSize + lineSpacing;
        }
        currentY -= lineSpacing * 2;
    }

    // ============================
    // Render recipients horizontally on each page
    // ============================
    const recipients = values.recipients || [];
    if (recipients.length > 0) {
        const pages = pdfDoc.getPages();

        for (const page of pages) {
            let sigX = margin;       // start from left
            const sigY = margin;     // fixed line at bottom

            for (const r of recipients) {
                // Draw recipient name
                page.drawText(r.name, { x: sigX, y: sigY, size: fontSize, font, color: rgb(0, 0, 0) });

                // Draw signature or placeholder
                const sigPosX = sigX + sigNameOffset;
                if (r.signature) {
                    const png = await pdfDoc.embedPng(r.signature);
                    page.drawImage(png, { x: sigPosX, y: sigY - 10, width: sigWidth, height: 50 });
                } else {
                    page.drawText("__________", { x: sigPosX, y: sigY, size: fontSize, font, color: rgb(0, 0, 0) });
                }

                // Move X for next recipient
                sigX += sigNameOffset + sigWidth + sigSpacing;
            }
        }
    }

    return pdfDoc.save();
}
