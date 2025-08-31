INSERT INTO user_refresh_tokens (user_id, token_hash, expires_at, device_info, ip_address)
VALUES ($1, $2, $3, $4, $5)
    RETURNING id, user_id, token_hash, created_at, expires_at, revoked, device_info, ip_address;