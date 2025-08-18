import { signatureController } from '@/server/controllers/signature.controller';

export async function POST(req: Request) {
    const payload = await req.json();

    try {
        const signer = await signatureController.invite(payload);
        return Response.json(signer);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 400 });
    }
}