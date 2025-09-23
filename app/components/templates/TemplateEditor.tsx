import { TemplateData, TemplateEditorProps, TextareaElement, SignatureElement } from "./types";
import { Recipient } from "../recipients/types";

export const TemplateEditor = <Data extends TemplateData = TemplateData>({
    initialData,
    onChange,
    recipientCount = 2,
}: TemplateEditorProps<Data>): Data => {

    // Default textarea element
    const defaultTextarea: TextareaElement = { id: 1, type: 'textarea', value: '' };
    // Default 2 recipients
    const generateRecipients = (count: number): Recipient[] =>
        Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            name: "",
            email: "",
            signature: null,
        }));

    // If initial data exists, return as is
    if (initialData?.elements?.length) {
        const elements = initialData.elements.map(el => {
            if (el.type === 'signature') {
                return {
                    ...el,
                    value:
                        el.value && el.value.length
                            ? el.value.slice(0, recipientCount).concat(
                                generateRecipients(recipientCount).slice(el.value.length)
                            )
                            : generateRecipients(recipientCount),
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
        id: 2,
        type: 'signature',
        pageRepeat: true,
        position: 'bottom',
        value: generateRecipients(recipientCount),
    };

    const templateData = {
        name: initialData?.name ?? '',
        elements: [defaultTextarea, signatureElement],
        pdfBase: initialData?.pdfBase,
    } as Data;

    onChange?.(templateData);
    return templateData;
};
