'use client';
import { useRouter } from 'next/navigation';

export default function LogoutBtn() {
    const router = useRouter();

    return (
        <button
            className="mr-auto px-4 py-1 bg-teal-950 rounded hover:bg-teal-900 text-white text-sm mt-auto"
            onClick={() => {
                localStorage.removeItem('authToken');
                router.push('/');
            }}
        >
            Logout
        </button>
    );
}
