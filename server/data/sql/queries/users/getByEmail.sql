SELECT id, email, name, password_hash, created_at
FROM users
WHERE email = $1
    LIMIT 1;