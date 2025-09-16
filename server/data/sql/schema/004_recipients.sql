-- Recipients table (signatories of the document)
CREATE TABLE IF NOT EXISTS recipients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- CREATE TABLE IF NOT EXISTS document_recipients (
--     id SERIAL PRIMARY KEY,
--     document_id INT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
--     recipient_id INT NOT NULL REFERENCES recipients(id) ON DELETE CASCADE,
--     status TEXT DEFAULT 'pending', -- pending, signed, declined
--     created_at TIMESTAMP DEFAULT NOW(),
--     UNIQUE(document_id, recipient_id)
-- );