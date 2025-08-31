'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import AuthWrapper from './AuthWrapper';
import AuthInput from './AuthInput';

type FormData = {
    email: string;
    name?: string;
    password: string;
};

export default function AuthForm() {
    const router = useRouter();
    const [mode, setMode] = useState<'login' | 'register'>('login');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.ok) {router.push('/page/dashboard')}

        reset();
    };

  const switchMode = (mode: 'login' | 'register') => {
    setMode(mode);
    reset();
  };

    return (
        <AuthWrapper>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-72 text-white">

              <div className="flex justify-center gap-4 mb-2">
                {(['login', 'register'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => switchMode(m)}
                    className={`px-4 py-1 rounded-full text-sm transition-all duration-300 ease-in-out transform hover:scale-105
                         ${mode === m ? 'bg-white text-gray-800' : 'bg-gray-600/50'}`}
                  >
                    {m === 'login' ? 'Login' : 'Register'}
                  </button>
                ))}
              </div>

                <AuthInput
                    placeholder="Email"
                    register={register('email', { required: 'Email is required' })}
                    error={errors.email}
                />

                {mode === 'register' && (
                    <AuthInput
                        placeholder="Name"
                        register={register('name', { required: 'Name is required' })}
                        error={errors.name}
                    />
                )}

                <AuthInput
                    placeholder="Password"
                    type="password"
                    register={register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min length is 6' } })}
                    error={errors.password}
                />

                <button
                    type="submit"
                    className="bg-white text-gray-800 py-2 rounded-full hover:bg-gray-200 text-sm
                               transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    {mode === 'login' ? 'Login' : 'Register'}
                </button>
            </form>
        </AuthWrapper>
    );
}
