import * as sigRepo from '@/server/data/repo/signature.repository';
import type { SignaturePayload } from '../types/signature.types';

export const signatureService = {
    invite: (payload: SignaturePayload) =>
        sigRepo.addSigner(payload.documentId, payload.signerId ?? null, payload.email, 'pending'),

    list: (documentId: string) => sigRepo.listSigners(documentId),

    sign: (signerId: string) => sigRepo.updateSignerStatus(signerId, 'signed'),

    decline: (signerId: string) => sigRepo.updateSignerStatus(signerId, 'declined'),
};
