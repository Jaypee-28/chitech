"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Bell, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  const [showConfirm, setShowConfirm] = useState(false);

  const fullName = session?.user?.name || "";
  const firstName = fullName?.split(" ")[0];
  const firstLetter = firstName?.charAt(0)?.toUpperCase() || "A";
  const userImage = session?.user?.image;
  const userEmail = session?.user?.email;

  return (
    <header className="h-16 bg-white shadow-lg px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo */}
      <Link href="/" className="py-2">
        <Image src="/logo.png" width={80} height={80} alt="Logo" />
      </Link>

      {/* Center: Search */}
      <div className="relative w-full max-w-md mx-auto">
        <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Bell & Avatar */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <div className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-white">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage
                src={userImage || undefined}
                alt={fullName}
                className="border border-gray-400 rounded-full"
              />
              <AvatarFallback className="border border-gray-400 rounded-full">
                {firstLetter}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 shadow-lg bg-gray-300"
          >
            <DropdownMenuLabel className="text-sm font-semibold">
              {fullName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={() => setShowConfirm(true)}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Logout confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm space-y-4">
            <h2 className="text-lg font-semibold">Confirm Logout</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  signOut();
                  setShowConfirm(false);
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
