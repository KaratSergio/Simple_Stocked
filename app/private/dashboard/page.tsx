'use client';
/*
Workflow of components:

TemplateCreate → creates a template and adds it to the list.
TemplateList → selecting a template updates selectedTemplate.
DocumentCreate → uses selectedTemplate.id and calls onCreate when creating a document, updating createdDocument.
DocumentList → selecting a document updates createdDocument.
RecipientAdd & RecipientList → work for the selected document (createdDocument.id).
SignatureList → displays signatures for the current document.
*/

import { useState, useEffect } from "react";
import { TemplateList, TemplateCreate } from "@/app/components/templates";
import { DocumentList, DocumentCreate } from "@/app/components/documents";
import { RecipientList, RecipientAdd } from "@/components/recipients";
import { SignatureList } from "@/components/signatures";

export default function DashboardPage() {
    const [templates, setTemplates] = useState<any[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

    const [documents, setDocuments] = useState<any[]>([]);
    const [createdDocument, setCreatedDocument] = useState<any>(null);

    const [ownerId] = useState(1); // current user

    // get templates
    useEffect(() => {
        fetch("/api/templates/list")
            .then(res => res.json())
            .then(data => {
                if (data.success) setTemplates(data.data);
            });
    }, []);

    // get docs
    useEffect(() => {
        fetch(`/api/documents/list?ownerId=${ownerId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setDocuments(data.data);
            });
    }, [ownerId, createdDocument]);

    return (
        <div className="space-y-8 p-6">

            {/* ======= Templates ======= */}
            <section className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Templates</h2>
                <TemplateCreate onCreate={template => {
                    setTemplates(prev => [...prev, template]);
                }} />
                <TemplateList
                    templates={templates}
                    selectedTemplate={selectedTemplate}
                    onSelect={setSelectedTemplate}
                />
            </section>

            {/* ======= Create Document ======= */}
            <section className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Create Document</h2>
                {selectedTemplate ? (
                    <DocumentCreate
                        templateId={selectedTemplate.id}
                        onCreate={doc => setCreatedDocument(doc)}
                    />
                ) : (
                    <p>Select a template to create a document.</p>
                )}
                <DocumentList
                    ownerId={ownerId}
                    documents={documents}
                    onSelect={setCreatedDocument}
                />
            </section>

            {/* ======= Recipients ======= */}
            <section className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Recipients</h2>
                {createdDocument ? (
                    <>
                        <RecipientAdd
                            documentId={createdDocument.id}
                            onAdd={recipient => {
                                // Reload the list or add locally
                            }}
                        />
                        <RecipientList documentId={createdDocument.id} />
                    </>
                ) : (
                    <p>Create a document first.</p>
                )}
            </section>

            {/* ======= Signatures ======= */}
            <section className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Signatures</h2>
                {createdDocument ? (
                    <SignatureList documentId={createdDocument.id} />
                ) : (
                    <p>Create a document first.</p>
                )}
            </section>

        </div>
    );
}
