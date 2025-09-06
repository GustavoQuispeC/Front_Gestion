import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClientNavbar from "./ClientNavbar";
import { ModeToggle } from "@/components/togle/Togle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gestion de Personal",
  description: "Desarrollado por gusstavodev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ClientNavbar /> {/* Use the client-side Navbar component */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
           <div
            style={{
              position: "fixed",
              top: 1,
              right: 20,
              zIndex: 1000,
            }}
          >
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
