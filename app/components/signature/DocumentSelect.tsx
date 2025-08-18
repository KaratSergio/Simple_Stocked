'use client';
import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';

type Document = { id: string; title: string };

type DocumentSelectProps = { documents: Document[] };

export const DocumentSelect: FC<DocumentSelectProps> = ({ documents }) => {
    const { control } = useFormContext();
    const options = documents.map(d => ({ value: d.id, label: d.title }));

    return (
        <div>
            <label className="block text-sm font-medium">Select Documents</label>
            <Controller
                control={control}
                name="documentIds"
                render={({ field: { onChange, value } }) => (
                    <Select
                        options={options}
                        isMulti
                        value={options.filter(o => value.includes(o.value))}
                        onChange={(selected) => onChange(selected.map((s: any) => s.value))}
                        placeholder="Select documents..."
                        isSearchable
                    />
                )}
            />
        </div>
    );
};
