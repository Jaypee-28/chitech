"use client";

import AccountInfo from "@/components/user/profile/AccountInfo";
import { SessionProvider } from "next-auth/react";

export default function AccountManagementPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Account Management</h2>
      <SessionProvider>
        <AccountInfo />
      </SessionProvider>
    </div>
  );
}
