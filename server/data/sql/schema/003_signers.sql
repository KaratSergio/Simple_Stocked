-- signatures table
CREATE TABLE IF NOT EXISTS signatures (
    id SERIAL PRIMARY KEY,
    document_id INT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    signer_id INT REFERENCES users(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, signed, declined
    signed_at TIMESTAMP
)