import * as docRepo from '@/server/data/repo/document.repository';
import type { DocumentDTO } from '@/server/types/document.types';

// create + upload metadata
export async function createDocument(ownerId: number, { title, file_url: fileUrl }: DocumentDTO) {
    return await docRepo.createDocument(ownerId, title, fileUrl, 'draft');
}

export async function getDocument(id: number) {
    return await docRepo.getDocumentById(id);
}

export async function listDocuments(ownerId: number) {
    return await docRepo.listDocumentsByOwner(ownerId);
}
