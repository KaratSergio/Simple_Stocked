import { r2 } from "@/server/config/r2.config";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFile(buffer: Buffer | Uint8Array, key: string, contentType = "application/pdf") {
    await r2.send(
        new PutObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        })
    );

    return `https://${process.env.S3_BUCKET}.r2.cloudflarestorage.com/${key}`;
}

export async function uploadPdf(bytes: Uint8Array, key: string) {
    return uploadFile(bytes, key, "application/pdf");
}