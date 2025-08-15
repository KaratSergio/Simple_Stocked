'use client';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
            style={{ backgroundImage: "url('/main.webp')" }}
        >
            <div className="rounded-full w-[500px] h-[500px] flex items-center justify-center
                bg-white/10 backdrop-blur-[3px] shadow-2xl border border-white/20 p-6 transition-all duration-500">
                {children}
            </div>
        </div>
    );
}
