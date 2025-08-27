INSERT INTO documents (template_id, owner_id, values, pdf_generated, status)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
