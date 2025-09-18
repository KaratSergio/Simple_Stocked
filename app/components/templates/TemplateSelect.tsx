import { TemplateSelectorProps } from "./types";
import { ChevronDown } from "lucide-react";

export const TemplateSelect = ({ templates, selectedId, onSelect }: TemplateSelectorProps) => (
  <div className="relative">
    <select
      value={selectedId ?? ""}
      onChange={e => {
        const value = e.target.value ? Number(e.target.value) : null;
        onSelect(value);
      }}
      className="appearance-none border p-2 pr-8 w-full bg-gray-100 text-black"
    >
      <option value="">Select template</option>
      {templates.map(t => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ))}
    </select>

    <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
      <ChevronDown size={16} className="text-gray-600" />
    </span>
  </div>
);
