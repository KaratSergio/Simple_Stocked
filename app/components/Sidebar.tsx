'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './auth/LogoutBtn';

const menu = [
    { key: 'dashboard', label: 'Dashboard', href: '/page/dashboard' },
    { key: 'templates', label: 'Templates', href: '/page/templates' },
    { key: 'documents', label: 'Documents', href: '/page/documents' },
    { key: 'signatures', label: 'Signatures', href: '/page/sign' },
    { key: 'settings', label: 'Settings', href: '/page/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-40 bg-teal-900 text-white flex flex-col p-4">
            {menu.map(item => {
                const isActive = pathname.startsWith(item.href);
                return (
                    <Link key={item.key} href={item.href}>
                        <button
                            className={`mb-2 px-3 py-2 text-left rounded transition-colors duration-200
                            ${isActive ? 'bg-teal-950' : 'hover:bg-teal-950'}`}
                        >
                            {item.label}
                        </button>
                    </Link>
                );
            })}
            <LogoutButton />
        </aside>
    );
}
