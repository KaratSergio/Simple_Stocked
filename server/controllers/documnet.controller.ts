import * as docService from '@/server/services/document.service';
import type { DocumentDTO } from '@/server/types/document.types';
import { toCamelCaseKeys } from '@/server/utils/convertorCase';

export async function create(ownerId: number, reqBody: DocumentDTO) {
    const body = toCamelCaseKeys(reqBody);

    if (!body.title || !body.fileUrl) throw new Error('Invalid document payload');

    return await docService.createDocument(ownerId, body);
}

export async function get(documentId: number) {
    return await docService.getDocument(documentId);
}

export async function list(ownerId: number) {
    return await docService.listDocuments(ownerId);
}
