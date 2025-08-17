-- document table
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    status TEXT DEFAULT 'draft', -- draft, pending, signed, rejected
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add column for the final signed file
ALTER TABLE documents ADD COLUMN IF NOT EXISTS signed_file_url TEXT;

-- Drop old status check constraint if it exists
ALTER TABLE documents DROP CONSTRAINT IF EXISTS documents_status_check;

-- Add new status check constraint
ALTER TABLE documents ADD CONSTRAINT documents_status_check
    CHECK (status IN ('draft','pending','in_progress','signed','declined')) NOT VALID;
