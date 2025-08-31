import { useParams } from "next/navigation";
import { Document } from "@/components/documents";

export default function DocumentPage() {
    const { id } = useParams() as { id: string };

    return <Document documentId={id} />;
}