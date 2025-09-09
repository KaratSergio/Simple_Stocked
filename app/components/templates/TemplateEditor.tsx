import { TemplateData, TemplateEditorProps, DocumentElement, SignatureElement } from "./types";

export const TemplateEditor = <Data extends TemplateData = TemplateData>({
    initialData,
    onChange,
}: TemplateEditorProps<Data>): Data => {

    // Default textarea element for the template
    const defaultTextarea: DocumentElement = { id: 'textarea_1', type: 'textarea' };

    // If initialData already has elements → return them as is
    if (initialData?.elements?.length) {
        const templateData = {
            name: initialData?.name ?? '',
            elements: initialData.elements,
            pdfBase: initialData?.pdfBase,
        } as Data;

        // Trigger onChange callback with existing data
        onChange?.(templateData);
        return templateData;
    }

    // For now, fixed number of signatures (2) → can be moved to form input later
    const signerCount = 2;

    // Generate default empty signature fields
    const defaultSignatures: SignatureElement[] = Array.from({ length: signerCount }).map(
        (_, i) => ({
            id: `signature_${i + 1}`,
            type: 'signature',
            role: `signer_${i + 1}`,
            pageRepeat: true,     // should appear on every page
            position: 'bottom',   // default position at the bottom
            value: "",            // default empty value (placeholder)
        })
    );

    // Combine textarea and signature elements into the template
    const templateData = {
        name: initialData?.name ?? '',
        elements: [defaultTextarea, ...defaultSignatures],
        pdfBase: initialData?.pdfBase,
    } as Data;

    // Trigger onChange callback with new template data
    onChange?.(templateData);
    return templateData;
};

