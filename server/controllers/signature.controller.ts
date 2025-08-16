import { signatureService } from '@/server/services/signature.service';
import type { SignatureDTO } from '../types/signature.types';
import { validateFields } from '@/server/utils/validators';

export const signatureController = {
    invite: (payload: Partial<SignatureDTO>) => {
        const data = validateFields<Partial<SignatureDTO>, { email: string; documentId: string; signerId?: string }>(
            payload,
            ['email', 'documentId', 'signerId']
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

    decline: (signerId: string) => {
        validateFields({ signerId }, ['signerId']);
        return signatureService.decline(signerId);
    },
};
