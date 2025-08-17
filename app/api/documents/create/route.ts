import { documentController } from '@/server/controllers/document.controller';

export async function POST(req: Request) {
  const body = await req.json();
  const { ownerId, title, fileUrl } = body;

  try {
    const doc = await documentController.create(ownerId, { title, fileUrl });
    return Response.json(doc);
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}
