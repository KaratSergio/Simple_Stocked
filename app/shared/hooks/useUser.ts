'use client';

import { useQuery } from '@tanstack/react-query';

async function fetchUser() {
    const res = await fetch('/api/user/me', { credentials: 'include' });
    if (!res.ok) return null;
    return res.json(); // { id, name, email }
}

export function useUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        staleTime: 1000 * 60 * 60 * 24,  // 1 day
        retry: false,
    });
}
