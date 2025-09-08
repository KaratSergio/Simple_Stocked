import Link from "next/link";
import { DocumentList } from "@/components/documents";
import { Files } from "lucide-react";

export default function DocumentsPage() {
    const ownerId = 5; // TO DO hardcode need to change

    return (
        <div className=" space-y-4">
            {/* create doc */}
            <Link href="/page/documents/create" className="w-fit flex gap-1 text-teal-900 py-1">
                <Files />
                Add New Document
            </Link>


            <h1 className="text-2xl font-bold">Documents</h1>

            {/* doc list */}
            <div className="mt-4">
                <DocumentList ownerId={ownerId} />
            </div>
        </div>
    );
}
