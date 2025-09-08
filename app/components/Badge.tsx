const statusStyles: Record<string, string> = {
    draft: 'bg-gray-300 text-gray-800',
    pending: 'bg-yellow-200 text-yellow-800',
    signed: 'bg-green-200 text-green-800',
    rejected: 'bg-red-200 text-red-800',
    archived: 'bg-blue-200 text-blue-800',
};

export const StatusBadge = ({ status }: { status: string }) => {
    const normalized = status?.toLowerCase();
    const style = statusStyles[normalized] || 'bg-gray-100 text-gray-700';

    return (
        <span className={`px-2 py-1 text-xs font-medium ${style}`}>
            {status}
        </span>
    );
};
