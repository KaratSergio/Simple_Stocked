-- signatures table
CREATE TABLE IF NOT EXISTS signatures (
    id SERIAL PRIMARY KEY,
    document_id INT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    signer_id INT REFERENCES users(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, signed, declined
    signed_at TIMESTAMP
);

-- Add new columns individually
ALTER TABLE signatures ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'signer';
ALTER TABLE signatures ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;
ALTER TABLE signatures ADD COLUMN IF NOT EXISTS signature_file_url TEXT;
ALTER TABLE signatures ADD COLUMN IF NOT EXISTS declined_reason TEXT;
ALTER TABLE signatures ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Drop old constraints individually
ALTER TABLE signatures DROP CONSTRAINT IF EXISTS signatures_role_check;
ALTER TABLE signatures DROP CONSTRAINT IF EXISTS signatures_status_check;

-- Add new constraints individually
ALTER TABLE signatures ADD CONSTRAINT signatures_role_check
    CHECK (role IN ('signer','viewer','approver')) NOT VALID;

ALTER TABLE signatures ADD CONSTRAINT signatures_status_check
    CHECK (status IN ('pending','viewed','signed','declined')) NOT VALID;

-- change type 
ALTER TABLE signatures 
    ALTER COLUMN email TYPE text[] USING ARRAY[email];

-- signature_documents: connection of the signatory with the documents
CREATE TABLE IF NOT EXISTS signature_documents (
    id SERIAL PRIMARY KEY,
    signature_id INT NOT NULL REFERENCES signatures(id) ON DELETE CASCADE,
    document_id INT NOT NULL REFERENCES documents(id) ON DELETE CASCADE
);