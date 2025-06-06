import { Sidebar } from "@/components/sidebar/Sidebar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen overflow-y-scroll antialiased bg-slate-100 text-slate-300 selection:bg-blue-600 selection:text-white">
      <div className="flex">
        <Sidebar />

        <div className="w-full text-slate-900">{children}</div>
      </div>
    </div>
  );
}
