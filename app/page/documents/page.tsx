import { DocumentList } from "@/components/documents";
import { List } from "lucide-react";

export default function DocumentsPage() {
    return (
        <div className=" space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <List size={32} className="text-teal-900" />
                <h1 className="text-2xl font-bold text-teal-900">list of Documents</h1>
            </div>

            <DocumentList />
        </div>
    );
}
