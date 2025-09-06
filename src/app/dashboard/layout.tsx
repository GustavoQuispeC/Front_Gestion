"use client";

import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Slide, ToastContainer } from "react-toastify";
// import { ModeToggle } from "@/components/togle/Togle";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-8 shrink-0 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>
          {/* <div className="flex-1" />
          <div className="flex items-center gap-2 justify-end mt-4 mr-2">
            <ModeToggle />
          </div> */}
        </header>

        <div className="m-4">{children}</div>
      </SidebarInset>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </SidebarProvider>
  );
}
