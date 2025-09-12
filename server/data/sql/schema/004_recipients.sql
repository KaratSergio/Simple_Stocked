-- Recipients table (signatories of the document)
CREATE TABLE IF NOT EXISTS recipients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    document_id INT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending', -- pending, signed, declined
    created_at TIMESTAMP DEFAULT NOW()
);