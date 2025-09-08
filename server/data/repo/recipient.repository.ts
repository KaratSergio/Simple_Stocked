import path from "path";
import { loadQuery } from "@/server/utils/sqlLoader";
import { query } from "@/server/config/db.config";
import { Recipient } from "@/server/types/recipient.types";

const basePath = path.join(process.cwd(), "server/data/sql/queries/recipients");

export async function addRecipient(
    documentId: number,
    email: string,
    status: "pending" | "signed" | "declined" = "pending"
): Promise<Recipient> {
    const sql = loadQuery(basePath, "add.sql");
    const result = await query(sql, [documentId, email, status]);
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

export async function listRecipientsByDocument(documentId: number): Promise<Recipient[]> {
    const sql = loadQuery(basePath, "listByDocument.sql");
    const result = await query(sql, [documentId]);
    return result.rows;
}
