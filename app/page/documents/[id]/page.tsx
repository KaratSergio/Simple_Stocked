import { Document } from "@/components/documents";
import { RecipientAdd } from "@/components/recipients";

export default function DocumentPage({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="flex gap-8 p-8">
            {/* Left: PDF */}
            <div className="">
                <Document documentId={id} />
            </div>

            {/* Right: Recipient form */}
            <div className="w-120">
                <h2 className="text-xl font-bold mb-4">Recipients</h2>
                <RecipientAdd documentId={id} />
            </div>
        </div>
    );
}
