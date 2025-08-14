import { r2 } from '@/server/config/r2.config';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const buffer = Buffer.from(await file.arrayBuffer());

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: file.name,
      Body: buffer,
    })
  );

  return Response.json({ success: true });
}