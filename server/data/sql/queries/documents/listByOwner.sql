SELECT * FROM documents WHERE owner_id = $1 ORDER BY created_at DESC;
