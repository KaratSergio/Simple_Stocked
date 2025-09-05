import { PDFDocument, rgb } from "pdf-lib";
import { r2 } from "@/server/config/r2.config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import fontkit from "@pdf-lib/fontkit";

// Breaks text into lines taking into account the page width
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

// Gets the font from S3
async function fetchFont(fontKey: string): Promise<Uint8Array> {
    const res = await r2.send(new GetObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: fontKey }));
    const chunks: Uint8Array[] = [];
    for await (const chunk of res.Body as any) chunks.push(chunk);
    return Buffer.concat(chunks);
}

// Generate PDF only from textarea with logs and page wrapping
export async function generatePdf(schema: any, values: any, pdfBase?: string): Promise<Uint8Array> {
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

    // Take text from values
    const firstKey = Object.keys(values)[0];
    let text = values[firstKey] || "";

    // Break the text into paragraphs by line breaks
    const paragraphs = text.split("\n");

    let totalLines = 0;
    paragraphs.forEach((para: any, pIndex: any) => {
        const lines = wrapText(para, font, fontSize, maxWidth);

        totalLines += lines.length;

        lines.forEach((line, lIndex) => {
            if (currentY - (fontSize + lineSpacing) < margin) {
                currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                currentY = pageHeight - margin;
            }

            currentPage.drawText(line,
                { x: margin, y: currentY, size: fontSize, font, color: rgb(0, 0, 0) });

            currentY -= fontSize + lineSpacing;
        });

        // Indent after paragraph
        currentY -= lineSpacing * 2;
    });

    return pdfDoc.save();
}
