INSERT INTO recipients (document_id, email, status)
VALUES ($1, $2, $3)
RETURNING *;