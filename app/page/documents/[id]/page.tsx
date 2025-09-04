import { Document } from "@/components/documents";

export default function DocumentPage({ params: { id } }: { params: { id: string } }) {
    return <Document documentId={id} />;
}