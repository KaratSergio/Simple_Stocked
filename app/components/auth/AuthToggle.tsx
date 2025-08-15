'use client';

interface AuthToggleProps {
    mode: 'login' | 'register';
    setMode: (mode: 'login' | 'register') => void;
    reset: () => void;
}

export default function AuthToggle({ mode, setMode, reset }: AuthToggleProps) {
    return (
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
    );
}
