import { DynamicFormProps } from "./types";

export const DynamicForm = ({ template, values, onChange }: DynamicFormProps) => (
  <div className="border p-4 space-y-2 bg-gray-50">
    {template.elements.map(el => {
      if (el.type === 'text') {
        return (
          <input
            key={el.id}
            placeholder={el.placeholder}
            value={values[el.id] || ''}
            onChange={e => onChange(el.id, e.target.value)}
            className="border p-2 w-full"
          />
        )
      }
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
          <div key={el.id} className="border h-24 w-full bg-gray-100 text-center flex items-center justify-center">
            Sign Here
          </div>
        )
      }
      return null
    })}
  </div>
);
