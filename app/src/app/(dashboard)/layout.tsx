import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { PyodideProvider } from "@/components/editor/PyodideProvider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PyodideProvider>
            <div className="flex flex-col md:flex-row min-h-screen bg-background">
                {/* Mobile Header */}
                <MobileNav />

                {/* Desktop Sidebar */}
                <div className="hidden md:block h-screen sticky top-0">
                    <Sidebar className="h-full" />
                </div>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </PyodideProvider>
    );
}
