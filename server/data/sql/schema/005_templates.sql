-- Document Templates
CREATE TABLE IF NOT EXISTS document_templates (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    json_schema JSONB NOT NULL,
    pdf_base TEXT, -- (optional) link to background/blank
    created_at TIMESTAMP DEFAULT NOW()
);