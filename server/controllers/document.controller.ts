import { documentService } from '@/server/services/document.service';
import type { DocumentPayload } from '../types/document.types';
import { validateFields } from '@/server/utils/validators';

export const documentController = {
    create: (ownerId: string, payload: DocumentPayload) => {
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

    updateStatus: (documentId: string, status: string, signedFileUrl?: string) => {
        validateFields({ documentId, status }, ['documentId', 'status'], false);
        return documentService.updateStatus(documentId, status, signedFileUrl);
    },
};
