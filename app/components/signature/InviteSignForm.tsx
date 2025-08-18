'use client';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { inviteSigner } from '@/api/signatures/signatures';
import { EmailsInput } from './EmailsInput';
import { RoleAndOrderInput } from './RoleAndOrderInput';
import { DocumentSelect } from './DocumentSelect';
import { FormButtons } from '../FormButtons';

type Document = { id: string; title: string };

type InviteFormValues = {
    emails: string;
    documentIds: string[];
    role: string;
    orderIndex: number;
};

type InviteFormProps = { onCancel?: () => void; documents: Document[] };

export default function InviteSignForm({ onCancel, documents }: InviteFormProps) {
    const methods = useForm<InviteFormValues>({
        defaultValues: {
            emails: '',
            documentIds: [],
            role: 'signer',
            orderIndex: 0,
        },
    });
    const { handleSubmit, setError } = methods;

    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit = async (data: any) => {
        // Convert the string with emails to an array
        const emails = data.emails
            .split(/[\n,]+/)
            .map((e: string) => e.trim())
            .filter(Boolean);

        if (emails.length === 0) {
            setError('emails', { type: 'manual', message: 'Please specify at least one email' });
            return;
        }

        if (data.documentIds.length === 0) {
            setError('documentIds', { type: 'manual', message: 'Please select at least one document' });
            return;
        }

        setLoading(true);
        setSubmitError(null);

        try {
            await inviteSigner({
                emails,
                documentIds: data.documentIds,
                role: data.role,
                orderIndex: data.orderIndex,
            });

            onCancel?.();
        } catch (err: any) {
            setSubmitError(err.message || 'Failed to invite');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="text-lg font-medium">Invite Signer(s)</h3>

                <EmailsInput />
                <RoleAndOrderInput />
                <DocumentSelect documents={documents} />

                {submitError && <p className="text-red-600 text-sm">{submitError}</p>}

                <FormButtons
                    submitText={loading ? 'Inviting...' : 'Invite'}
                    onCancel={onCancel}
                    loading={loading}
                    submitColor="green"
                    submitType="submit"
                />
            </form>
        </FormProvider>
    );
}
