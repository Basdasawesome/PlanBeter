import { Head } from "@inertiajs/react";
import { Toaster } from "sonner";
import ToastHandler from "@/components/ToastHandler";
import { cn } from "@/lib/utils";
import AppHeader from "./Header";

export default function AppLayout({ title, children, fullWidth = false }: { title?: string, children: React.ReactNode, fullWidth?: boolean }) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-primary/5">
            <ToastHandler />
            <Toaster position="top-center" expand={true} richColors />

            {title && (
                <Head title={title} />
            )}
            <AppHeader />
            <main className={cn("mx-auto flex h-full w-full flex-1 flex-col gap-4 rounded-xl ", fullWidth ? "max-w-full" : "max-w-7xl")}>
                {children}
            </main>

        </div>
    );
}