import * as docRepo from '@/server/data/repo/document.repository';
import type { DocumentPayload } from '../types/document.types';

export const documentService = {
    create: (ownerId: string, payload: DocumentPayload) =>
        docRepo.createDocument(ownerId, payload.title, payload.fileUrl, 'draft'),

    get: (documentId: string) => docRepo.getDocumentById(documentId),

    list: (ownerId: string) => docRepo.listDocumentsByOwner(ownerId),
};
