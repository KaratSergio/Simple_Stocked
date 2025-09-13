UPDATE documents
SET 
    status = $2,
    pdf_generated = COALESCE($3, pdf_generated),
    values = COALESCE($4, values)
WHERE id = $1
RETURNING *;