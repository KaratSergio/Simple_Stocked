INSERT INTO auth_logs (user_id, event_type, ip, device_info)
VALUES ($1, $2, $3, $4)
    RETURNING *;
