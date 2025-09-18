import { DocumentCreate } from "@/components/documents";
import { Files } from "lucide-react";

export default function CreateDocumentPage() {
    return (
        <div>
            <div className="flex gap-2 align-center mb-4">
                <Files size={32} className="text-teal-900" />
                <h1 className="text-2xl font-bold text-teal-900">create a Document</h1>
            </div>

            <DocumentCreate />
        </div>
    );
}
