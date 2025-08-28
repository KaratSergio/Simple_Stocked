-- Signatures table (actual signatures)
CREATE TABLE IF NOT EXISTS signatures (
    id SERIAL PRIMARY KEY,
    document_id INT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    recipient_id INT NOT NULL REFERENCES recipients(id) ON DELETE CASCADE,
    signature_data TEXT NOT NULL, -- base64 signature or svg/json
    created_at TIMESTAMP DEFAULT NOW()
);