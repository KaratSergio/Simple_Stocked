SELECT *
FROM user_refresh_tokens
WHERE user_id = $1
ORDER BY created_at DESC;
