-- document table
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    status TEXT DEFAULT 'draft', -- draft, pending, signed, rejected
    created_at TIMESTAMP DEFAULT NOW()
)