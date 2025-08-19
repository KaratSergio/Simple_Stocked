import * as sigRepo from '@/server/data/repo/signature.repository';
import { sendInvite } from '@/server/services/mailer.service';

export const signatureService = {
    invite: async (payload: {
        emails: string[];
        documentIds: string[];
        signerId?: string;
        role?: string;
        orderIndex?: number;
    }) => {
        const { emails, documentIds, signerId, role = 'signer', orderIndex = 0 } = payload;

        const { signature, linkedDocs } = await sigRepo.addSigner({
            emails,
            documentIds,
            signerId,
            role,
            status: 'pending',
            orderIndex
        });

        // For each related entry we send a letter
        for (const doc of linkedDocs) {
            for (const email of emails) {
                sendInvite(email, doc.document_id.toString(), signature.id.toString());
            }
        }

        return { signature, linkedDocs };
    },

    list: (documentId: string) => sigRepo.listSigners(documentId),

    sign: (signerId: string, signatureFileUrl?: string) =>
        sigRepo.updateSignerStatus({
            signerId,
            status: 'signed',
            signatureFileUrl
        }),

    decline: (signerId: string, reason: string) =>
        sigRepo.updateSignerStatus({
            signerId,
            status: 'declined',
            reason
        }),
};
