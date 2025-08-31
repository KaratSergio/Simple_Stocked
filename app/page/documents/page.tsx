import Link from "next/link";
import { DocumentList } from "@/components/documents";

export default function DocumentsPage() {
    const ownerId = 5; // TO DO hardcode need to change

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Documents</h1>

            {/* create doc */}
            <Link href="app/page/documents/create" className="btn">
                Create Document
            </Link>

            {/* doc list */}
            <div className="mt-4">
                <DocumentList ownerId={ownerId}/>
            </div>
        </div>
    );
}
