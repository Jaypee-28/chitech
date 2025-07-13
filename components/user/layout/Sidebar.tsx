"use client";

import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProductFilterStore } from "@/stores/useProductFilterStore";
import { ShoppingCart, User, LayoutDashboard } from "lucide-react"; // Lucide icons

interface SidebarProps {
  isOpen: boolean;
}

interface Category {
  _id: string;
  name: string;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const username = session?.user?.name || "Guest";

  const { selectedCategory, selectedBrands, setCategory, toggleBrand } =
    useProductFilterStore();

  const [greeting, setGreeting] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const brands = ["HP", "DELL", "APPLE", "LENOVO"];

  useEffect(() => {
    const hour = new Date().getHours();
    const timeGreeting =
      hour < 12
        ? "Good morning"
        : hour < 18
          ? "Good afternoon"
          : "Good evening";
    setGreeting(timeGreeting);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/category");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside
      id="mobile-sidebar"
      className={cn(
        "bg-white shadow-lg flex flex-col mt-18 max-md:mt-14 justify-between fixed inset-y-0 left-0 z-40 w-72 p-4 transition-transform duration-300",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div>
        {/* Greeting */}
        <div className="mb-2 text-lg font-semibold text-gray-800">
          {greeting},{" "}
          <span className="text-blue-600">{username.split(" ")[0]}</span>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          What would you love to shop today?
        </p>

        {/* Category Filters */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Category</h3>
          <div className="flex flex-col gap-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!selectedCategory}
                onChange={() => setCategory(null)}
              />
              All
            </label>
            {categories.map((cat) => (
              <label key={cat._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat.name}
                  onChange={() => setCategory(cat.name)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filters */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Brands</h3>
          <div className="flex flex-col gap-2 text-sm">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Orders, Profile, Logout */}
      <div className="border-t pt-4 text-sm text-gray-700 space-y-3">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 hover:text-blue-600",
            pathname === "/dashboard" && "text-blue-600 font-medium"
          )}
        >
          <LayoutDashboard className="w-4 h-4" /> Dashboard
        </Link>

        <Link
          href="/dashboard/orders"
          className={cn(
            "flex items-center gap-2 hover:text-blue-600",
            pathname === "/orders" && "text-blue-600 font-medium"
          )}
        >
          <ShoppingCart className="w-4 h-4" />
          Order History
        </Link>

        <Link
          href="/dashboard/profile"
          className={cn(
            "flex items-center gap-2 hover:text-blue-600",
            pathname === "/profile" && "text-blue-600 font-medium"
          )}
        >
          <User className="w-4 h-4" /> Profile
        </Link>

        {/* <button
          onClick={() => signOut()}
          className="flex items-center gap-2 w-full hover:text-red-600"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button> */}
      </div>
    </aside>
  );
}
