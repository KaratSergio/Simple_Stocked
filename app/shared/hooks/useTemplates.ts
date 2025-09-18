'use client';

import { useQuery } from '@tanstack/react-query';
import { Template } from '@/app/components/templates/types';

async function fetchTemplates(): Promise<Template[]> {
    const res = await fetch('/api/templates/list');
    const json = await res.json();
    return json.success ? json.data : [];
}

export function useTemplates() {
    return useQuery<Template[]>({
        queryKey: ['templates'],
        queryFn: fetchTemplates,
        staleTime: 1000 * 60 * 60 * 24,  // 1 day
        retry: false,
    });
}
