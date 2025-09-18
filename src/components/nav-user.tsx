"use client";

import { useEffect, useState } from "react";

import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

type User = {
  username: string;
  photoUrl: string;
  roles: string[];
};

export function NavUser() {
  const { isMobile } = useSidebar();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false); // Estado para verificar si el componente se ha montado

  useEffect(() => {
    setMounted(true); // Garantiza que solo se ejecute después de que el componente esté montado
  }, []);

  useEffect(() => {
    if (mounted) {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            setUser({
              username: parsed.username,
              photoUrl: parsed.photoUrl,
              roles: parsed.roles || [],
            });
          } catch (error) {
            console.error("Error parsing user from localStorage", error);
          }
        }
      }
    }
  }, [mounted]);

  const logout = () => {
    localStorage.clear(); // Limpiar localStorage al cerrar sesión
  };

  if (!mounted || !user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              aria-label="Menú de usuario"
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.photoUrl || "/path/to/default/avatar.png"}
                  alt={user.username}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.username}</span>
                <span className="truncate text-xs">
                  {user.roles.join(", ") || "Sin rol"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.photoUrl || "/path/to/default/avatar.png"}
                    alt={user.username}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.username}</span>
                  <span className="truncate text-xs">
                    {user.roles.join(", ") || "Sin rol"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              {/* Link que redirige a "/" (home) después de cerrar sesión */}
              <Link href="/" onClick={logout} className="flex items-center gap-2">
                <LogOut />
                Cerrar Sesión
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
