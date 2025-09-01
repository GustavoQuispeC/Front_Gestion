
"use client";
import { usePathname } from "next/navigation";
import { ComplexNavbar } from "@/components";

const ClientNavbar = () => {
  const pathname = usePathname();
  // Si la ruta comienza con "/dashboard" o "/login", no mostrar el navbar
  return pathname?.startsWith("/dashboard") || pathname?.startsWith("/login") ? null : <ComplexNavbar />;
};

export default ClientNavbar;
