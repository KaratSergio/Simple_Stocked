-- add signer
INSERT INTO signatures (document_id, signer_id, email, role, status, order_index)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- list signers by document
SELECT * FROM signatures WHERE document_id = $1 ORDER BY order_index ASC, id ASC;

-- update signer status
UPDATE signatures
SET status = $2,
    signed_at = CASE WHEN $2 = 'signed' THEN NOW() ELSE signed_at END,
    declined_reason = CASE WHEN $2 = 'declined' THEN $3 ELSE declined_reason END,
    updated_at = NOW()
WHERE id = $1
RETURNING *;