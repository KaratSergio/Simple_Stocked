export async function sendInvite(email: string, documentId: string, signatureId: string) {
    const link = `http://localhost:3000/private/sign/${signatureId}?doc=${documentId}`;

    const body = {
        sender: { name: 'Document Signing Platform (DSP-service)', email: 'safonov.json@gmail.com' },
        to: [{ email }],
        subject: 'You have been invited to sign a document',
        htmlContent: `
            <p>Hello!</p>
            <p>You have been invited to sign a document.</p>
            <p><a href="${link}">Click here to access the document</a></p>
        `
    };

    try {
        const res = await fetch('https://api.sendinblue.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.SENDINBLUE_KEY!,
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Sendinblue API error: ${res.status} ${text}`);
        }

        console.log(`[Mailer] Invite sent to ${email}`);
    } catch (err) {
        console.error('[Mailer] Failed to send invite:', err);
    }
}
