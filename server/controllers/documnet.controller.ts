import { documentService } from '@/server/services/document.service';
import type { DocumentDTO } from '../types/document.types';
import { validateFields } from '@/server/utils/validators';

export const documentController = {
    create: (ownerId: string, payload: DocumentDTO) => {
        const validatedPayload = validateFields(payload, ['title', 'fileUrl']);
        validateFields({ ownerId }, ['ownerId'], false);

        return documentService.create(ownerId, validatedPayload);
    },


    get: (documentId: string) => {
        validateFields({ documentId }, ['documentId'], false);
        return documentService.get(documentId);
    },

    list: (ownerId: string) => {
        validateFields({ ownerId }, ['ownerId'], false);
        return documentService.list(ownerId);
    },
};
