-- add signer
INSERT INTO signatures (document_id, signer_id, email, status)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- list signers by document
SELECT * FROM signatures WHERE document_id = $1;

-- update signer status
UPDATE signatures SET status = $2, signed_at = NOW()
WHERE id = $1
RETURNING *;