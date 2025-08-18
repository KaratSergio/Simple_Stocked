import { signatureService } from '@/server/services/signature.service';
import type { SignatureDTO } from '../types/signature.types';
import { validateFields } from '@/server/utils/validators';

export const signatureController = {
    invite: (payload: Partial<SignatureDTO>) => {
        const data = validateFields<Partial<SignatureDTO>, { emails: string[]; documentIds: string[]; signerId?: string; role?: string; orderIndex?: number }>(
            payload,
            ['emails', 'documentIds']
        );

        return signatureService.invite({
            emails: data.emails,
            documentIds: data.documentIds,
            signerId: data.signerId,
            role: data.role,
            orderIndex: data.orderIndex
        });
    },

    list: (documentId: string) => {
        validateFields({ documentId }, ['documentId']);
        return signatureService.list(documentId);
    },

    sign: (signerId: string, signatureFileUrl?: string) => {
        validateFields({ signerId }, ['signerId']);
        return signatureService.sign(signerId, signatureFileUrl);
    },

    decline: (signerId: string, reason: string) => {
        validateFields({ signerId }, ['signerId']);
        return signatureService.decline(signerId, reason);
    },
};
