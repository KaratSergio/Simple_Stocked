UPDATE documents
SET status = $2, pdf_generated = COALESCE($3, pdf_generated)
WHERE id = $1
RETURNING *;
