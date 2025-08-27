import fs from "fs";
import path from "path";
import { query } from "@/server/config/db.config";
import { Recipient } from "@/server/types/recipient.types";

const basePath = path.join(process.cwd(), "server/data/sql/queries/recipients");

function loadQuery(name: string) {
    return fs.readFileSync(path.join(basePath, name), "utf8");
}

export async function addRecipient(
    documentId: number,
    email: string,
    status: "pending" | "signed" | "declined" = "pending"
): Promise<Recipient> {
    const sql = loadQuery("add.sql");
    const result = await query(sql, [documentId, email, status]);
    return result.rows[0];
}

export async function updateRecipientStatus(
    recipientId: number,
    status: "pending" | "signed" | "declined"
): Promise<Recipient> {
    const sql = loadQuery("updateStatus.sql");
    const result = await query(sql, [recipientId, status]);
    return result.rows[0];
}

export async function listRecipientsByDocument(documentId: number): Promise<Recipient[]> {
    const sql = loadQuery("listByDocument.sql");
    const result = await query(sql, [documentId]);
    return result.rows;
}
