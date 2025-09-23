import { getDocumentById } from "@/server/services/document.service";
import { getRecipientById } from "@/server/services/recipient.service";
import { SignatureAdd } from "@/components/signatures";

interface Props {
    params: { id: number };
    searchParams: { doc: number };
}

export default async function SignPage({ params, searchParams }: Props) {
    const documentId = searchParams.doc;
    const recipientId = params.id;

    const doc = await getDocumentById(documentId);
    const recipient = await getRecipientById(recipientId);

    if (!doc || !recipient) {
        return <p>Document or recipient not found</p>;
    }

    // Public PDF URL
    const publicPdfUrl = doc.pdf_generated?.replace(
        process.env.NEXT_PUBLIC_S3_BASE_URL!,
        process.env.NEXT_PUBLIC_S3_PUBLIC_URL!
    ) ?? "";

    if (!publicPdfUrl) return <p>PDF not available yet</p>;

    return (
        <div className="flex gap-8 p-8">
            {/* Left: PDF */}
            <div className="flex-1">
                <iframe src={publicPdfUrl} width="100%" height="1200px" className="border" />
            </div>

            {/* Right: Canvas for signature */}
            <div className="w-96">
                <h2 className="text-xl font-bold mb-4">Sign as {recipient.email}</h2>
                <SignatureAdd documentId={documentId} recipientId={recipientId} />
            </div>
        </div>
    );
}
