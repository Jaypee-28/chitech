// app/(user)/dashboard/profile/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, User, Lock } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const username = session?.user?.name || "Guest";

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        👋 Hello, {username.split(" ")[0]}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage your personal account and security settings.
      </p>

      <div className="space-y-4">
        <Link
          href="/dashboard/profile/account"
          className="flex items-center gap-3 p-4 border rounded-md hover:bg-gray-50 transition"
        >
          <User className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-700">Account Management</span>
        </Link>

        <Link
          href="/dashboard/profile/security"
          className="flex items-center gap-3 p-4 border rounded-md hover:bg-gray-50 transition"
        >
          <Lock className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-700">Login Settings</span>
        </Link>
      </div>

      <div className="mt-8 border-t pt-4">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 text-red-600 font-medium hover:underline"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
