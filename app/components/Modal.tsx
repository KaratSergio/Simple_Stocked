'use client';
import { useModalStore } from '@/store/modalStore';

export default function Modal() {
    const { isOpen, content, closeModal } = useModalStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
                {content}
            </div>
        </div>
    );
}
