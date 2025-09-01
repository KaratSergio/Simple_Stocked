CREATE TABLE auth_logs (
                           id SERIAL PRIMARY KEY,
                           user_id INT NULL,
                           event_type VARCHAR(50) NOT NULL,  -- login, logout, refresh, register, failed_login и т.п.
                           ip VARCHAR(50),
                           device_info TEXT,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
