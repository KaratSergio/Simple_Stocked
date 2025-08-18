import { signatureController } from '@/server/controllers/signature.controller';

export async function POST(req: Request) {
  const { signerId, signatureFileUrl } = await req.json();
  try {
    const signer = await signatureController.sign(signerId, signatureFileUrl);
    return Response.json(signer);
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}
