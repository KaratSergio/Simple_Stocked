'use client';
import { FC, ReactNode } from 'react';

type FormButtonsProps = {
    submitText?: string;
    cancelText?: string;
    onCancel?: () => void;
    loading?: boolean;
    submitColor?: string;
    submitType?: 'submit' | 'button';
    children?: ReactNode;
};

export const FormButtons: FC<FormButtonsProps> = ({
    submitText = 'Submit',
    cancelText = 'Cancel',
    onCancel,
    loading = false,
    submitColor = 'green',
    submitType = 'submit',
    children,
}) => {
    const bgColor = {
        green: 'bg-green-600 hover:bg-green-700',
        blue: 'bg-blue-600 hover:bg-blue-700',
        red: 'bg-red-600 hover:bg-red-700',
    }[submitColor] || 'bg-green-600 hover:bg-green-700';

    return (
        <div className="flex gap-2">
            <button
                type={submitType}
                disabled={loading}
                className={`px-4 py-2 text-white rounded ${bgColor}`}
            >
                {loading ? 'Loading...' : submitText}
            </button>

            <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
                {cancelText}
            </button>

            {children}
        </div>
    );
};
