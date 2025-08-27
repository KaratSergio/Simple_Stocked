INSERT INTO document_templates (name, json_schema, pdf_base)
VALUES ($1, $2, $3)
RETURNING *;