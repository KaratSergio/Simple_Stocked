import { DynamicFormProps } from "./types";
import { Recipient } from "../recipients/types";

export const DynamicForm = ({ template, values, onChange }: DynamicFormProps) => {

  const handleRecipientChange = (elId: number, index: number, field: keyof Recipient, value: string) => {
    const updated = [...(values[elId] as Recipient[] || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange(elId, updated);
  };

  return (
    <div className="border p-4 space-y-4 bg-gray-50">
      {template.elements.map(el => {
        if (el.type === "textarea") {
          return (
            <textarea
              key={el.id}
              placeholder="Enter text"
              value={values[el.id] as string || ""}
              onChange={e => onChange(el.id, e.target.value)}
              className="border p-2 w-full min-h-[400px]"
            />
          );
        }

        if (el.type === "signature") {
          const recipients = values[el.id] as Recipient[] || [];
          return (
            <div key={el.id} className="space-y-2">
              <p>Recipients:</p>
              {recipients.map((r, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Enter recipient name"
                    value={r.name}
                    onChange={e => handleRecipientChange(el.id, idx, "name", e.target.value)}
                    className="border p-2 w-1/4"
                  />

                  <input
                    type="text"
                    placeholder="Signature Base64"
                    value={r.signature || ""}
                    onChange={e => handleRecipientChange(el.id, idx, "signature", e.target.value)}
                    className="border p-2 w-1/2 hidden"
                  />
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
