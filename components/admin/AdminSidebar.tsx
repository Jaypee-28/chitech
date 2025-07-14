"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Category", href: "/admin/category", icon: Package },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className=" mt-16  w-64 bg-white shadow-lg p-4 flex flex-col justify-between fixed ">
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          {user?.image ? (
            <Image
              src={user.image}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-white font-bold">
              {initials}
            </div>
          )}
          <div>
            <p className="font-semibold">{user?.name || "Admin"}</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-100 text-sm transition",
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-700"
                )}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-60 border-t pt-4">
        <Link
          href="/admin/profile"
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-100 text-sm transition",
            pathname.startsWith("/admin/profile")
              ? "bg-blue-100 text-blue-600 font-medium"
              : "text-gray-700"
          )}
        >
          <UserCircle size={18} />
          Profile
        </Link>
      </div>
    </aside>
  );
}
