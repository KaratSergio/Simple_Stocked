INSERT INTO signatures (document_id, recipient_id, signature_data)
VALUES ($1, $2, $3)
RETURNING *;
