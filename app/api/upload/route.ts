import { uploadFile } from "@/server/utils/s3Storage";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return Response.json({ error: "File required" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());

  const fileUrl = await uploadFile(buffer, file.name, file.type);

  return Response.json({ fileUrl });
}