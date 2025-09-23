'use client';

import { useQuery } from '@tanstack/react-query';
import { useUser } from './useUser';

export interface Document {
    id: number;
    title: string;
    status: string;
    created_at: string;
}

export function useDocuments() {
    const { data: user } = useUser();

    return useQuery<Document[]>({
        queryKey: ['documents', user?.id],
        queryFn: async () => {
            if (!user?.id) return [];
            const res = await fetch(`/api/documents/list?ownerId=${user.id}`);
            const json = await res.json();
            return json.success ? json.data : [];
        },
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 60 * 24,  // 1 day
        retry: false,
    });
}
