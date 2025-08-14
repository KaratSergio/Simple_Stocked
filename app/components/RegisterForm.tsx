'use client';
import { useState } from 'react';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, password }),
            });

            const data = await res.json();
            setResult(JSON.stringify(data));
        } catch {
            setResult('Error sending request');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Register</button>
            <pre>{result}</pre>
        </form>
    );
}
