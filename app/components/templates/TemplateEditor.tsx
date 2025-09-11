import { TemplateData, TemplateEditorProps, TextareaElement, SignatureElement } from "./types";
import { Recipient } from "../recipients/types";

export const TemplateEditor = <Data extends TemplateData = TemplateData>({
    initialData,
    onChange,
}: TemplateEditorProps<Data>): Data => {

    // Default textarea element
    const defaultTextarea: TextareaElement = { id: 'textarea_1', type: 'textarea', value: '' };
    // Default 2 recipients
    const defaultRecipients: Recipient[] = [
        { name: 'Recipient 1', signature: null },
        { name: 'Recipient 2', signature: null },
    ];

    // If initial data exists, return as is
    if (initialData?.elements?.length) {
        const elements = initialData.elements.map(el => {
            if (el.type === 'signature') {
                return {
                    ...el,
                    value: (el.value && el.value.length) ? el.value : defaultRecipients
                };
            }
            return el;
        });

        const templateData = {
            name: initialData.name ?? '',
            elements,
            pdfBase: initialData.pdfBase,
        } as Data;

        onChange?.(templateData);
        return templateData;
    }

    // Use a single "signature" element as placeholder for recipients
    const signatureElement: SignatureElement = {
        id: 'recipients_1',
        type: 'signature',
        pageRepeat: true,
        position: 'bottom',
        value: defaultRecipients,
    };

    const templateData = {
        name: initialData?.name ?? '',
        elements: [defaultTextarea, signatureElement],
        pdfBase: initialData?.pdfBase,
    } as Data;

    onChange?.(templateData);
    return templateData;
};
