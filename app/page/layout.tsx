import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
// import Modal from '@/components/Modal';


export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header title="Document Signing Platform (DSP-service)" />
                <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
                {/* <Modal /> */}
            </div>
        </div>
    );
}
