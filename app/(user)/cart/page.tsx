// app/cart/page.tsx
"use client";

import Header from "@/components/user/layout/Header";
import Sidebar from "@/components/user/layout/Sidebar";
import CartContent from "@/components/user/cart/CartContent";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function CartPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <SessionProvider>
      {/* <Sidebar isOpen={isSidebarOpen} /> */}
      <Header onToggleSidebar={toggleSidebar} />
      <CartContent />
    </SessionProvider>
  );
}
