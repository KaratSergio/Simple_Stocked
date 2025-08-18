import { SignaturePayload } from "@/server/types/signature.types";

export async function inviteSigner(payload: SignaturePayload) {
    const res = await fetch('/api/signatures/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
    return res.json();
}


export async function signDocument(signerId: string, signatureFileUrl?: string) {
    const res = await fetch('/api/signatures/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ signerId, signatureFileUrl }),
    });
    return res.json();
}

export async function declineDocument(signerId: string, reason: string) {
    const res = await fetch('/api/signatures/decline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ signerId, reason }),
    });
    return res.json();
}
