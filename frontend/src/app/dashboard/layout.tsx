import Sidebar from "@/features/gig/components/DriverSidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[var(--bg)] transition-colors duration-700 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col h-full overflow-hidden">
                <DashboardHeader />

                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
