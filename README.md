# Document Signing Platform (DSP-service)

## Description

A mini-service for uploading documents, assigning signatories, and tracking signature statuses.
Stack used: Next.js + PostgreSQL (Neon) + Redis (Upstash) + Cloudflare R2.

---

## Architecture

Frontend → API → [Redis ↔ PostgreSQL → Cloudflare R2] → API → Frontend

Redis — cache validation/cache writes.

PostgreSQL — source of truth for data.

Cloudflare R2 — file storage.

---

```
project-root/
├─ app/ # Next.js App Router
│ ├─ api/ # API endpoints
│ ├─ private/ # Private pages (only after login)
│ ├─ page.tsx # Public main page
│ └─ layout.tsx # Public page layout
├─ server/ # Server logic
│ ├─ config/ # DB, Redis, R2 connection
│ ├─ data/ # SQL + repositories (data access layer)
│ ├─ services/ # Business logic
│ └─ controllers/ # Service calls + validation
├─ shared/ # Types and utilities for the front and back ends
├─ components/ # React components
├─ stores/ # TanStack state management
├─ services/ # Server API calls
├─ utils/ # Utilities (PDF, data conversion)
└─ styles/
```
---

## Main Entities

- **Templates** — JSON document schemas.
- **Documents** — document instances based on templates.
- **Recipients** — users to whom documents were sent.
- **Signatures** — recipient signatures.

---

## Event Loop

1. **Template Creation** → `TemplateService.create(json_schema)` → `document_templates`
2. **Document Creation** → `DocumentService.create(template_id, values)` → `documents`
3. **PDF Generation** → `PdfService.generate(...)` → R2
4. **Signing** → `RecipientService.sign(document_id, email, signature)` → status update in `recipients`
5. **Finalization** → `status = signed` → resulting PDF in `documents.pdf_generated`

---

## Dashboard

- **Dashboard** — activity overview, quick actions (upload a document, invite for signature).
- **Documents** — document list, filters, CRUD.
- **Signatures** — recipient management and event log.
- **Settings** — profile, integrations, organization (multi-tenant).

---

## Frontend

- **DocumentForm** — form rendering from JSON schema.
- **TemplateBuilder** — template builder with field customization.
- **SignaturePad** — signature drawing component.
- **TanStack** — document and template state management.

---

## Backend

- **PostgreSQL (Neon)** — main database.
- **Redis (Upstash)** — caching.
- **Cloudflare R2** — PDF storage.
- **SQL files** — each query in a separate file, repositories with typing.
- **Services** — pure business logic, validations, document versions.
- **Controllers** — minimal data validation, service calls.

---

## Useful links

- [Neon PostgreSQL](https://neon.com/)  
- [Redis Upstash](https://console.upstash.com/auth/sign-in)  
- [Cloudflare R2](https://dash.cloudflare.com/login)  
- [Tailwind palette](https://www.colorome.com/web-color-palettes/tailwind)  
- [Lucide Icons](https://lucide.dev/icons/)  

---