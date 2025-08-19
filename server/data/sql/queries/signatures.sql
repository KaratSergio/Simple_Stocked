-- add signer
INSERT INTO signatures (signer_id, email, role, status, order_index)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- link signature to documents
INSERT INTO signature_documents (signature_id, document_id)
VALUES ($1, $2)
RETURNING *;

-- list signers by document
SELECT s.*, sd.document_id
FROM signatures s
JOIN signature_documents sd ON s.id = sd.signature_id
WHERE sd.document_id = $1;

-- update signer status
UPDATE signatures
SET status = $2,
    signed_at = CASE WHEN $2 = 'signed' THEN NOW() ELSE signed_at END,
    declined_reason = CASE WHEN $2 = 'declined' THEN $3 ELSE declined_reason END,
    updated_at = NOW()
WHERE id = $1
RETURNING *;
