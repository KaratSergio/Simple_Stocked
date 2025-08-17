import { signatureService } from '@/server/services/signature.service';
import type { SignatureDTO } from '../types/signature.types';
import { validateFields } from '@/server/utils/validators';

export const signatureController = {
    invite: (payload: Partial<SignatureDTO>) => {
        const data = validateFields<Partial<SignatureDTO>,
            { email: string; documentId: string; signerId?: string, role: string, orderIndex: number }
        >(
            payload,
            ['email', 'documentId', 'signerId', 'role', 'orderIndex']
        );

        return signatureService.invite(data);
    },

    list: (documentId: string) => {
        validateFields({ documentId }, ['documentId']);
        return signatureService.list(documentId);
    },

    sign: (signerId: string) => {
        validateFields({ signerId }, ['signerId']);
        return signatureService.sign(signerId);
    },

    decline: (signerId: string, reason: string) => {
        validateFields({ signerId }, ['signerId']);
        return signatureService.decline(signerId, reason);
    },
};
