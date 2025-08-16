export interface DocumentDTO {
    owner_id: string;
    title: string;
    file_url: string;
    status: string;
    created_at: string;
}

export interface DocumentPayload {
    title: string;
    fileUrl: string;
}
