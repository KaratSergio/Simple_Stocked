export async function sendInvite(email: string, documentId: number, recipientId: number) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const link = `${baseUrl}/page/sign/${recipientId}?doc=${documentId}`;

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

        const responseText = await res.text();
        // console.log("[Mailer] Raw response:", responseText);

        if (!res.ok) throw new Error(`Sendinblue API error: ${res.status} ${responseText}`);

        console.log(`[Mailer] Invite sent to ${email}`);
    } catch (err) {
        console.error('[Mailer] Failed to send invite:', err);
    }
}
