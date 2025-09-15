SELECT r.id, r.name, r.email, r.status, r.document_id
FROM recipients r
JOIN documents d ON d.id = r.document_id
WHERE d.owner_id = $1
ORDER BY r.id;