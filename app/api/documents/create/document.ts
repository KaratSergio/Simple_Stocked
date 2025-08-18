export async function createDocument(ownerId: string, title: string, fileUrl: string) {
    const res = await fetch('/api/documents/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ownerId, title, fileUrl }),
    });
    return res.json();
}
