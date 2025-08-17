import * as sigRepo from '@/server/data/repo/signature.repository';
import type { SignaturePayload } from '../types/signature.types';

export const signatureService = {
    invite: (payload: SignaturePayload) =>
        sigRepo.addSigner({
            documentId: payload.documentId,
            signerId: payload.signerId ?? null,
            email: payload.email,
            role: payload.role ?? 'signer',
            status: 'pending',
            orderIndex: payload.orderIndex ?? 0,
        }),

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
