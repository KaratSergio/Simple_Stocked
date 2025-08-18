'use client';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { getErrorMessage } from '@/shared/utils';

export const EmailsInput: FC = () => {
    const { register, formState: { errors } } = useFormContext();

    const errorMessage = getErrorMessage(errors.emails);

    return (
        <div>
            <label className="block text-sm font-medium">Emails</label>
            <textarea
                {...register('emails', {
                    required: 'Please provide at least one email',
                    validate: (value: string) => {
                        const emails = value
                            .split(/[\n,]+/)
                            .map(e => e.trim())
                            .filter(Boolean);
                        if (emails.length === 0) return 'Please provide at least one email';
                        const invalid = emails.find(e => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
                        return invalid ? `Invalid email: ${invalid}` : true;
                    }
                })}
                className="w-full border rounded px-3 py-2"
                rows={4}
                placeholder="Enter one or more emails, separated by commas or new lines"
            />
            {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
        </div>
    );
};
