export async function inviteSigner(payload: {
    documentId: string;
    email: string;
    role?: string;
    orderIndex?: number;
}) {
    const res = await fetch('/api/signatures/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
    return res.json();
}
