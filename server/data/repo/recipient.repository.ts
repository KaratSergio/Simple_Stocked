import path from "path";
import { loadQuery } from "@/server/utils/sqlLoader";
import { query } from "@/server/config/db.config";
import { Recipient } from "@/server/types/recipient.types";

const basePath = path.join(process.cwd(), "server/data/sql/queries/recipients");

export async function addRecipient(
    documentId: string,
    name: string,
    email: string,
    status: "pending" | "signed" | "declined" = "pending"
): Promise<Recipient> {
    const sql = loadQuery(basePath, "add.sql");
    const result = await query(sql, [documentId, name, email, status]);
    return result.rows[0];
}

export async function updateRecipientStatus(
    recipientId: number,
    status: "pending" | "signed" | "declined"
): Promise<Recipient> {
    const sql = loadQuery(basePath, "updateStatus.sql");
    const result = await query(sql, [recipientId, status]);
    return result.rows[0];
}

export async function listRecipientsByDocument(documentId: string): Promise<Recipient[]> {
    const sql = loadQuery(basePath, "listByDocument.sql");
    const result = await query(sql, [documentId]);
    return result.rows;
}

export async function listRecipientsByOwner(ownerId: number): Promise<Recipient[]> {
    const sql = loadQuery(basePath, "listByOwner.sql");
    const result = await query(sql, [ownerId]);
    return result.rows;
}

export async function getRecipientById(recipientId: number): Promise<Recipient | null> {
    const sql = loadQuery(basePath, "getById.sql");
    const result = await query(sql, [recipientId]);
    return result.rows[0] || null;
}

// Update recipient email (or other fields in the future)
export async function updateRecipient(
    recipientId: number,
    email: string
): Promise<Recipient> {
    const sql = loadQuery(basePath, "updateEmail.sql");
    const result = await query(sql, [email, recipientId]);
    return result.rows[0];
}
