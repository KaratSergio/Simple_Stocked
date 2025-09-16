UPDATE recipients
SET email = $1
WHERE id = $2
RETURNING *;
