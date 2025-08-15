'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
    email: string;
    name?: string;
    password: string;
};

export default function AuthForm() {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [result, setResult] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const json = await res.json();
        setResult(JSON.stringify(json, null, 2));
        reset();
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
            style={{ backgroundImage: "url('/main.webp')" }}
        >
            <div className="rounded-full w-[500px] h-[500px] flex items-center justify-center
            bg-white/10  backdrop-blur-[3px] shadow-2xl border border-white/20 p-6 transition-all duration-500">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-72 text-white">

                    {/* Toggle */}
                    <div className="flex justify-center gap-4 mb-2">
                        <button
                            type="button"
                            onClick={() => { setMode('login'); reset(); }}
                            className={`px-4 py-1 rounded-full text-sm transition-all duration-300 ease-in-out transform hover:scale-105 ${mode === 'login' ? 'bg-white text-gray-800' : 'bg-gray-600/50'}`}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => { setMode('register'); reset(); }}
                            className={`px-4 py-1 rounded-full text-sm transition-all duration-300 ease-in-out transform hover:scale-105 ${mode === 'register' ? 'bg-white text-gray-800' : 'bg-gray-600/50'}`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Inputs */}
                    <input
                        {...register('email', { required: 'Email is required' })}
                        className="p-2 rounded bg-gray-700/50 focus:outline-none text-sm placeholder-gray-300
                        transition-all duration-300 ease-in-out hover:bg-gray-700/70 focus:bg-gray-700/80"
                        placeholder="Email"
                    />
                    {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}

                    {mode === 'register' && (
                        <>
                            <input
                                {...register('name', { required: 'Name is required' })}
                                className="p-2 rounded bg-gray-700/50 focus:outline-none text-sm placeholder-gray-300
                                transition-all duration-300 ease-in-out hover:bg-gray-700/70 focus:bg-gray-700/80"
                                placeholder="Name"
                            />
                            {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
                        </>
                    )}

                    <input
                        {...register('password', { required: 'Password is required', minLength: 6 })}
                        className="p-2 rounded bg-gray-700/50 focus:outline-none text-sm placeholder-gray-300
                        transition-all duration-300 ease-in-out hover:bg-gray-700/70 focus:bg-gray-700/80"
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && <span className="text-xs text-red-400">{errors.password.message}</span>}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-white text-gray-800 py-2 rounded-full hover:bg-gray-200 text-sm
                        transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        {mode === 'login' ? 'Login' : 'Register'}
                    </button>

                    {/* Result */}
                    {result && (
                        <pre className="bg-gray-900/50 p-2 rounded text-xs overflow-x-auto mt-2 transition-all duration-300">
                            {result}
                        </pre>
                    )}
                </form>
            </div>
        </div>
    );
}
