// src/app/(app)/layout.tsx
"use client"; // Required for SidebarProvider and hooks like usePathname

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/icons/logo";
import {
  LayoutDashboard,
  Settings,
  Wand2,
  ScrollText,
  PanelLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/configure", label: "Configure", icon: Settings },
  { href: "/schema-mapping", label: "Schema Mapping", icon: Wand2 },
  { href: "/reports", label: "Reports", icon: ScrollText },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const sidebarContent = (
    <>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="text-primary" />
          <h1 className="text-xl font-semibold">SheetSync</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, side: "right", className: "ml-2" }}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {item.label}
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        {/* Can add user profile or settings here */}
      </SidebarFooter>
    </>
  );
  
  if (isMobile === undefined) {
    // Avoid rendering anything until mobile status is known to prevent hydration mismatch
    // or render a generic loading state
    return <div className="flex h-screen w-screen items-center justify-center bg-background"><LayoutDashboard className="h-8 w-8 animate-spin text-primary" /></div>;
  }


  return (
    <SidebarProvider defaultOpen={true}>
      {isMobile ? (
        <Sheet>
          <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Logo className="text-primary h-7 w-7" />
              <span className="text-lg font-semibold">SheetSync</span>
            </Link>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
          </header>
          <SheetContent side="left" className="w-72 p-0">
            {sidebarContent}
          </SheetContent>
          <main className="p-4 sm:p-6">{children}</main>
        </Sheet>
      ) : (
        <div className="flex min-h-screen">
          <Sidebar collapsible="icon" className="border-r">
            {sidebarContent}
          </Sidebar>
          <SidebarInset className="flex flex-col">
             <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">
               <SidebarTrigger className="hidden group-data-[collapsible=icon]/sidebar-wrapper:hidden md:flex" />
               <div className="flex-1 text-lg font-semibold">
                {navItems.find(item => pathname.startsWith(item.href))?.label || "SheetSync"}
               </div>
               {/* Additional header content, e.g. user menu */}
             </header>
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </SidebarInset>
        </div>
      )}
    </SidebarProvider>
  );
}
