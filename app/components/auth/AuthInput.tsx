'use client';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface AuthInputProps {
    placeholder: string;
    type?: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
}

export default function AuthInput({ placeholder, type = 'text', register, error }: AuthInputProps) {
    return (
        <div>
            <input
                {...register}
                type={type}
                placeholder={placeholder}
                className="p-2 rounded bg-gray-700/50 focus:outline-none text-sm placeholder-gray-300
                           transition-all duration-300 ease-in-out hover:bg-gray-700/70 focus:bg-gray-700/80 w-full"
            />
            {error && <span className="text-xs text-red-400">{error.message}</span>}
        </div>
    );
}
