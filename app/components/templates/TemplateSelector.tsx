interface TemplateSelectorProps {
  templates: { id: number; name: string }[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export const TemplateSelector = ({ templates, selectedId, onSelect }: TemplateSelectorProps) => (
  <select
    value={selectedId ?? ""}
    onChange={e => {
      const value = e.target.value ? Number(e.target.value) : null;
      onSelect(value);
    }}
    className="border p-2"
  >
    <option value="">Select template</option>
    {templates.map(t => (
      <option key={t.id} value={t.id}>
        {t.name}
      </option>
    ))}
  </select>
);
