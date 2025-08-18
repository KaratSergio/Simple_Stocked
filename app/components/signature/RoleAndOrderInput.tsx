'use client';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

export const RoleAndOrderInput: FC = () => {
    const { register } = useFormContext();

    return (
        <div className="flex gap-4">
            <div className="flex-1">
                <label className="block text-sm font-medium">Role</label>
                <select {...register('role')} className="w-full border rounded px-3 py-2">
                    <option value="signer">Signer</option>
                    <option value="viewer">Viewer</option>
                </select>
            </div>
            <div className="flex-1">
                <label className="block text-sm font-medium">Order Index</label>
                <input
                    type="number"
                    {...register('orderIndex', { valueAsNumber: true })}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
        </div>
    );
};
