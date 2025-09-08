'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './auth/LogoutBtn';
import {
    Home, FileType, FileText,
    Edit3, Settings
} from 'lucide-react';

const menu = [
    { key: 'dashboard', label: 'Dashboard', href: '/page/dashboard', icon: Home },
    { key: 'templates', label: 'Templates', href: '/page/templates', icon: FileType },
    { key: 'documents', label: 'Documents', href: '/page/documents', icon: FileText },
    { key: 'signatures', label: 'Signatures', href: '/page/sign', icon: Edit3 },
    { key: 'settings', label: 'Settings', href: '/page/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-40 bg-teal-900 text-white flex flex-col p-4">
            {menu.map(item => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                    <Link key={item.key} href={item.href}>
                        <button
                            className={`mb-2 px-3 py-2 text-left rounded flex items-center gap-2 transition-colors duration-200
                            ${isActive ? 'bg-teal-950' : 'hover:bg-teal-950'}`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    </Link>
                );
            })}
            <LogoutButton />
        </aside>
    );
}
