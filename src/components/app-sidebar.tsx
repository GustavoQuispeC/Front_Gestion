"use client";

import * as React from "react";
import {
  AudioWaveform,
  CircleUserRound,
  Command,
  FolderCog,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  ScanBarcode,
  UserLock,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Data sin user
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Productos",
      url: "#",
      icon: ScanBarcode,
      isActive: true,
      items: [
        {
          title: "lista de productos",
          url: "#",
        },
        {
          title: "Registro de productos",
          url: "#",
        },
      ],
    },
    {
      title: "Empleados",
      url: "#",
      icon: CircleUserRound,
      items: [
        {
          title: "Lista de Empleados",
          url: "/dashboard/employeeList",
        },
        {
          title: "Registro de Empleados",
          url: "/dashboard/employeeRegister",
        },
      ],
    },
    {
      title: "Usuarios",
      url: "#",
      icon: UserLock,
      items: [
        {
          title: "Lista de Usuarios",
          url: "/dashboard/userList",
        },
        {
          title: "Registro de Usuarios",
          url: "/dashboard/userRegister",
        },
      ],
    },
    {
      title: "Control de Personal",
      url: "#",
      icon: FolderCog,
      items: [
        {
          title: "Control de vacaciones",
          url: "/dashboard/employeeVacation",
        },
        {
          title: "Control de faltas",
          url: "/dashboard/employeeAbsence",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser /> {/* Ya no pasa props */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
