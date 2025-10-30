"use client";

import {
  Banknote,
  Bus,
  ChartSpline,
  CircleDollarSign,
  HandCoins,
  MoreHorizontal,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Administración</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem asChild>
                  <a href="/dashboard/transporte" className="flex items-center gap-2">
                    <Bus className="text-muted-foreground" />
                    <span>Transportes</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CircleDollarSign className="text-muted-foreground" />
                  <span>Bancos</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HandCoins className="text-muted-foreground" />
                  <span>Gastos vehiculares</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PhoneCall className="text-muted-foreground" />
                  <span>Telefonía</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ChartSpline className="text-muted-foreground" />
                  <span>Otros gastos</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Banknote className="text-muted-foreground" />
                  <span>Notas de crédito</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
