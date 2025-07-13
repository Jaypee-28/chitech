"use client";

import ChangePasswordModal from "@/components/user/profile/ChangePasswordModal";
import { SessionProvider } from "next-auth/react";

export default function LoginSettingPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Login Settings</h2>
      <SessionProvider>
        <ChangePasswordModal />
      </SessionProvider>
    </div>
  );
}
