"use client";

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SessionProvider } from "next-auth/react";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      <SessionProvider>
        <AdminSidebar />
      </SessionProvider>

      <div className="flex flex-col flex-1">
        {/* Header */}
        <SessionProvider>
          <Header />
        </SessionProvider>

        {/* Main Content */}
        <main className="flex-1 p-6 ml-60">
          <SessionProvider>{children}</SessionProvider>
        </main>
      </div>
    </div>
  );
}
