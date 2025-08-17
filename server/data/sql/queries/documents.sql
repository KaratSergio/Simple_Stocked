-- create document
INSERT INTO documents (owner_id, title, file_url, status, created_at)
VALUES ($1, $2, $3, $4, NOW())
RETURNING *;

-- get document by id
SELECT * FROM documents WHERE id = $1;

-- list documents by owner
SELECT * FROM documents WHERE owner_id = $1 ORDER BY created_at DESC;

-- update document status
UPDATE documents
SET status = $2, signed_file_url = COALESCE($3, signed_file_url), created_at = created_at
WHERE id = $1
RETURNING *;