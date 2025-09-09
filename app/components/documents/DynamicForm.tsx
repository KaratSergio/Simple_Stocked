import { DynamicFormProps } from "./types";

export const DynamicForm = ({ template, values, onChange }: DynamicFormProps) => (
  <div className="border p-4 space-y-2 bg-gray-50">
    {template.elements.map(el => {
      if (el.type === 'textarea') {
        return (
          <textarea
            key={el.id}
            placeholder={el.placeholder}
            value={values[el.id] || ''}
            onChange={e => onChange(el.id, e.target.value)}
            className="border p-2 w-full"
          />
        )
      }

      if (el.type === 'signature') {
        return (
          <input
            key={el.id}
            type="text"
            placeholder={el.name || "Sign Here"}
            value={values[el.id] || ""}
            onChange={e => onChange(el.id, e.target.value)}
            className="border-b border-dashed border-black w-full text-center py-2"
          />
        )
      }

      return null
    })}
  </div>
);
