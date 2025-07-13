"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/user/layout/Sidebar";
import Header from "@/components/user/layout/Header";
import Footer from "@/components/user/layout/Footer";
import { SessionProvider } from "next-auth/react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      if (isSidebarOpen && sidebar && !sidebar.contains(e.target as Node)) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <SessionProvider>
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </SessionProvider>

      <div className="flex flex-1 w-full overflow-x-hidden">
        {/* Sidebar */}
        <SessionProvider>
          <Sidebar isOpen={isSidebarOpen} />
        </SessionProvider>

        {/* Main content */}
        <main className="flex-1 p-4 md:ml-72 mt-4 overflow-x-hidden">
          <SessionProvider>{children}</SessionProvider>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
