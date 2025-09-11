import { PDFDocument, rgb } from "pdf-lib";
import { r2 } from "@/server/config/r2.config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import fontkit from "@pdf-lib/fontkit";

export interface Recipient {
    name: string;
    signature?: string | null;   // base64 canvas signatures
}

// ============================
// Utility: Wrap text
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
// Fetch font
// ============================
async function fetchFont(fontKey: string): Promise<Uint8Array> {
    const res = await r2.send(new GetObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: fontKey }));
    const chunks: Uint8Array[] = [];
    for await (const chunk of res.Body as any) chunks.push(chunk);
    return Buffer.concat(chunks);
}

// ============================
// Generate PDF
// ============================
export async function generatePdf(
    schema: any,
    values: { textarea_1: string; recipients: Recipient[] },
    pdfBase?: string
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetchFont("DejaVuSans.ttf");
    const font = await pdfDoc.embedFont(fontBytes);

    const pageWidth = schema.pageWidth || 595;
    const pageHeight = schema.pageHeight || 842;
    const margin = 50;
    const fontSize = 12;
    const lineSpacing = 4;
    const maxWidth = pageWidth - 2 * margin;

    let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    let currentY = pageHeight - margin;

    // Render textarea
    const text = values.textarea_1 || "";
    const paragraphs = text.split("\n");

    for (const para of paragraphs) {
        const lines = wrapText(para, font, fontSize, maxWidth);
        for (const line of lines) {
            if (currentY - fontSize < margin) {
                currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                currentY = pageHeight - margin;
            }
            currentPage.drawText(line, { x: margin, y: currentY, size: fontSize, font, color: rgb(0, 0, 0) });
            currentY -= fontSize + lineSpacing;
        }
        currentY -= lineSpacing * 2;
    }

    // Render recipients with signature
    const recipients = values.recipients || [];
    if (recipients.length > 0) {
        const pages = pdfDoc.getPages();
        for (const page of pages) {
            let sigX = margin;
            const sigY = margin;

            for (const r of recipients) {
                if (r.signature) {
                    const png = await pdfDoc.embedPng(r.signature);
                    page.drawImage(png, { x: sigX, y: sigY, width: 150, height: 50 });
                } else {
                    page.drawText(`${r.name} ____________`, { x: sigX, y: sigY, size: fontSize, font, color: rgb(0, 0, 0) });
                }
                sigX += 200;
            }
        }
    }

    return pdfDoc.save();
}
