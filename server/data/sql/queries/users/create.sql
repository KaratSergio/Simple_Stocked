INSERT INTO users (email, name, password_hash, created_at)
VALUES ($1, $2, $3, NOW())
    RETURNING id, email, name, created_at;