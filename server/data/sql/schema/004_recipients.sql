-- Recipients table (signatories of the document)
CREATE TABLE IF NOT EXISTS recipients (
    id SERIAL PRIMARY KEY,
    document_id INT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, signed, declined
    created_at TIMESTAMP DEFAULT NOW()
);