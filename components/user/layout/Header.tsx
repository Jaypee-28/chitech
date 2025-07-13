"use client";

import {
  Menu,
  Search,
  ShoppingCart,
  LogOut,
  User,
  X as CloseIcon,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCartItemCount } from "@/stores/useCartStore";
import { useProductFilterStore } from "@/stores/useProductFilterStore";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";

export default function Header({
  onToggleSidebar,
  isSidebarOpen,
}: {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useProductFilterStore();
  const cartCount = useCartItemCount();
  const [showSearch, setShowSearch] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery || "");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const userImage = session?.user?.image;
  const userInitial = session?.user?.email?.charAt(0).toUpperCase() || "U";

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const debouncedSetQuery = useCallback(
    debounce((val: string) => {
      setSearchQuery(val.trim());
    }, 400),
    []
  );

  useEffect(() => {
    debouncedSetQuery(localQuery);
  }, [localQuery]);

  const handleClearSearch = () => {
    setLocalQuery("");
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      debouncedSetQuery.cancel();
      setSearchQuery(localQuery.trim());
    }
  };

  return (
    <>
      <header className="bg-white sticky  top-0 z-50 px-4 max-md:py-2 flex items-center justify-between shadow-md">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={onToggleSidebar}
          >
            {isSidebarOpen ? <CloseIcon size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/">
            <span className="text-lg font-bold block md:hidden">CHITECH</span>
            <Image
              src="/logo.png"
              width={80}
              height={80}
              alt="Logo"
              className="hidden md:block"
            />
          </Link>
        </div>

        {/* CENTER: Desktop search */}
        <div className="hidden md:flex w-full max-w-md mx-auto relative">
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for products..."
            className="w-full max-w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {localQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              <CloseIcon size={16} />
            </button>
          )}
          <button
            onClick={() => setSearchQuery(localQuery.trim())}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
          >
            <Search size={18} />
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Mobile search toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
          >
            <Search size={20} />
          </button>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Avatar or Login */}
          {session?.user ? (
            <div
              className="relative"
              onClick={() => {
                if (isMobile) setShowDropdown((prev) => !prev);
              }}
              onMouseEnter={() => !isMobile && setShowDropdown(true)}
              onMouseLeave={() => !isMobile && setShowDropdown(false)}
            >
              {userImage ? (
                <Image
                  src={userImage}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full border cursor-pointer"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-sm text-gray-700 border cursor-pointer">
                  {userInitial}
                </div>
              )}
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 w-40 z-50">
                  <p className="text-sm font-medium text-gray-800 px-2 truncate">
                    {session.user.name}
                  </p>
                  <hr className="my-2" />
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 px-2 py-1 text-sm hover:text-blue-600"
                  >
                    <User size={14} /> Profile
                  </Link>
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="flex items-center gap-2 px-2 py-1 text-sm text-left w-full hover:text-red-600"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="text-sm font-semibold px-4 py-1.5 rounded-md border border-gray-800 hover:bg-gray-100 transition"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Mobile search field */}
      {showSearch && (
        <div className="md:hidden px-4 pt-2 pb-2 bg-white shadow-sm overflow-hidden">
          <div className="relative w-full max-w-full overflow-hidden">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for products..."
              className="w-full overflow-y-auto overflow-x-auto px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {localQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
              >
                <CloseIcon size={16} />
              </button>
            )}
            <button
              onClick={() => setSearchQuery(localQuery.trim())}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
            <p className="text-sm text-gray-600 mb-4">
              Do you really want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-1 text-sm border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => signOut()}
                className="px-4 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
