"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookText,
  CircleUserRound,
  Command,
  FolderCog,
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
      name: "Gusstavo Dev.",
      logo: GalleryVerticalEnd,
      plan: "Desarrollo",
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
          url: "/dashboard/productoListar",
        },
        {
          title: "Registro de productos",
          url: "/dashboard/productoRegistrar",
        },
      ],
    },
    {
      title: "Proveedores",
      url: "#",
      icon: UserLock,
      items: [
        {
          title: "Lista de Proveedores",
          url: "/dashboard/proveedorListar",
        },
        {
          title: "Registro de Proveedores",
          url: "/dashboard/proveedorRegistrar",
        },
      ],
    },
    {
      title: "Clientes",
      url: "#",
      icon: UserLock,
      items: [
        {
          title: "Lista de Clientes",
          url: "/dashboard/clienteListar",
        },
        {
          title: "Registro de Clientes",
          url: "/dashboard/clienteRegistrar",
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
        {
          title: "Adelanto de salario",
          url: "/dashboard/employeeSalaryAdvance",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Documentos contables",
      url: "#",
      icon: BookText,
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
