'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutButton } from './auth/LogoutButton';
import {
    Home, FileType, FileText,
    Edit3, Settings, ChevronDown
} from 'lucide-react';

const menu = [
    { key: 'dashboard', label: 'Dashboard', href: '/page', icon: Home },
    {
        key: 'templates',
        label: 'Templates',
        icon: FileType,
        subMenu: [
            { key: 'create', label: 'Create', href: '/page/templates', }
        ]
    },
    {
        key: 'documents',
        label: 'Documents',
        icon: FileText,
        subMenu: [
            { key: 'list', label: 'List', href: '/page/documents' },
            { key: 'create', label: 'Create', href: '/page/documents/create' }
        ]
    },
    { key: 'signatures', label: 'Signatures', href: '/page/sign', icon: Edit3 },
    { key: 'settings', label: 'Settings', href: '/page/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [openKeys, setOpenKeys] = useState<{ [key: string]: boolean }>({});

    const toggleSubMenu = (key: string) => {
        setOpenKeys(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <aside className="w-48 bg-teal-900 text-white flex flex-col p-4">
            {menu.map(item => {
                const Icon = item.icon;
                const isActive =
                    item.href && (item.href === '/page'
                        ? pathname === '/page'
                        : pathname.startsWith(item.href));

                const hasSubMenu = !!item.subMenu;

                return (
                    <div key={item.key} className="mb-2">
                        <button
                            onClick={() => hasSubMenu && toggleSubMenu(item.key)}
                            className={`w-full px-3 py-2 text-left rounded flex items-center justify-between gap-2 transition-colors duration-200
                                ${isActive ? 'bg-teal-950' : 'hover:bg-teal-950'}`}
                        >
                            <div className="flex items-center gap-2">
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </div>
                            {hasSubMenu && (
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${openKeys[item.key] ? 'rotate-180' : ''
                                        }`}
                                />
                            )}
                        </button>

                        {hasSubMenu && (
                            <div
                                className={`ml-6 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${openKeys[item.key] ? 'max-h-40' : 'max-h-0'
                                    }`}
                            >
                                {item.subMenu!.map(sub => (
                                    <Link key={sub.key} href={sub.href}>
                                        <button
                                            className={`w-[130px] px-2 py-1 text-left rounded text-sm transition-colors duration-200
                                                ${pathname === sub.href ? 'bg-teal-950' : 'hover:bg-teal-950'}`}
                                        >
                                            {sub.label}
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            <LogoutButton />
        </aside>
    );
}
