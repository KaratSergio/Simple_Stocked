import * as sigRepo from '@/server/data/repo/signature.repository';

export const signatureService = {
    invite: async (payload: {
        emails: string[];
        documentIds: string[];
        signerId?: string;
        role?: string;
        orderIndex?: number;
    }) => {
        const { emails, documentIds, signerId, role = 'signer', orderIndex = 0 } = payload;

        return sigRepo.addSigner({
            emails,
            documentIds,
            signerId,
            role,
            status: 'pending',
            orderIndex
        });
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
