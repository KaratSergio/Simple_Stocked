'use client';

import { useRouter } from 'next/navigation';
import { Unplug } from 'lucide-react';

export const LogoutButton = () => {
    const router = useRouter();

    async function handleLogout() {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (e) {
            console.error('Logout failed', e);
        } finally {
            router.push('/');
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="mr-auto flex gap-2 p-1 bg-teal-950 rounded
                    hover:bg-teal-900 text-white text-sm mt-auto"
        >
            {/* Exit */}
            <Unplug size={18} />
        </button>
    );
}
