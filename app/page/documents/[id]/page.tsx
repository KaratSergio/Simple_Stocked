import { Document } from "@/components/documents";

export default function DocumentPage({ params: { id } }: { params: { id: string } }) {
    return (
        <div>
            <Document documentId={id} />
        </div>
    )

}