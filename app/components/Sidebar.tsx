'use client';
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from './auth/LogoutBtn';

const menu = [
    { key: 'dashboard', label: 'Dashboard', href: '/page/dashboard' },
    { key: 'templates', label: 'Templates', href: '/page/templates' },
    { key: 'documents', label: 'Documents', href: '/page/documents' },
    { key: 'signatures', label: 'Signatures', href: '/page/sign' },
    { key: 'settings', label: 'Settings', href: '/page/settings' },
];

export default function Sidebar() {
    const [active, setActive] = useState('');

    return (
        <aside className="w-60 bg-gray-900 text-white flex flex-col p-4">
            {menu.map(item => (
                <Link key={item.key} href={item.href}>
                    <button
                        onClick={() => setActive(item.key)}
                        className={`mb-2 px-3 py-2 text-left rounded transition-colors duration-200
                            ${active === item.key ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                    >
                        {item.label}
                    </button>
                </Link>
            ))}
            <LogoutButton />
        </aside>
    );
}
