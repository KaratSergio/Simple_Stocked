import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';


// will allow you to safely get the error message from FieldError | Merge <...> | undefined.
export function getErrorMessage(
    error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
): string | null {
    if (!error) return null;
    if (typeof error === 'string') return error;
    if ((error as FieldError).message) return (error as FieldError).message as string;
    return null;
}