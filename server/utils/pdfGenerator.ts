import { PDFDocument, rgb } from "pdf-lib";
import { r2 } from "@/server/config/r2.config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import fontkit from "@pdf-lib/fontkit";

// ============================
// Utility: Wrap text to fit page width
// ============================
function wrapText(text: string, font: any, fontSize: number, maxWidth: number): string[] {
    if (typeof text !== "string") text = String(text);
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
// Utility: Fetch font from S3
// ============================
async function fetchFont(fontKey: string): Promise<Uint8Array> {
    const res = await r2.send(new GetObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: fontKey }));
    const chunks: Uint8Array[] = [];
    for await (const chunk of res.Body as any) chunks.push(chunk);
    return Buffer.concat(chunks);
}

// ============================
// Main PDF Generator
// ============================
export async function generatePdf(
    schema: any,       // DocumentTemplate JSON
    values: Record<string, string>,  // Filled values
    pdfBase?: string
): Promise<Uint8Array> {

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetchFont("DejaVuSans.ttf");
    const font = await pdfDoc.embedFont(fontBytes);

    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 50;
    const fontSize = 12;
    const lineSpacing = 4;
    const maxWidth = pageWidth - 2 * margin;

    let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    let currentY = pageHeight - margin;

    // ============================
    // Step 1: Render text fields
    // ============================
    for (const el of schema.elements) {
        if (el.type !== 'textarea') continue;

        const text = values[el.id] || "";
        const paragraphs = text.split("\n");

        paragraphs.forEach((para: string) => {
            const lines = wrapText(para, font, fontSize, maxWidth);

            lines.forEach((line) => {
                if (currentY - (fontSize + lineSpacing) < margin) {
                    // Add new page if running out of space
                    currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                    currentY = pageHeight - margin;
                }

                currentPage.drawText(line, { x: margin, y: currentY, size: fontSize, font, color: rgb(0, 0, 0) });
                currentY -= fontSize + lineSpacing;
            });

            // Add extra spacing after paragraph
            currentY -= lineSpacing * 2;
        });
    }

    // ============================
    // Step 2: Render signature fields
    // ============================
    const signatures = schema.elements.filter((el: any) => el.type === 'signature');

    if (signatures.length > 0) {
        const sigHeight = 50; // height reserved for signatures
        const sigSpacing = 20; // space between multiple signatures

        // Loop through all pages
        const pages = pdfDoc.getPages();
        for (const page of pages) {
            let sigX = margin;
            const sigY = margin; // bottom of page

            signatures.forEach((sig: any) => {
                const sigText = values[sig.id] || "____________________";
                page.drawText(sigText, { x: sigX, y: sigY, size: fontSize, font, color: rgb(0, 0, 0) });
                sigX += 200; // move X for next signature
            });
        }
    }

    return pdfDoc.save();
}
