export default function Header({ title }: { title: string }) {
    return (
        <header className="h-16 bg-gray-100 flex items-center px-4 shadow">
            <h1 className="text-lg font-semibold">{title}</h1>
        </header>
    );
}
