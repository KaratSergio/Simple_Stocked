INSERT INTO recipients (document_id, name, email, status)
VALUES ($1, $2, $3, $4)
RETURNING *;