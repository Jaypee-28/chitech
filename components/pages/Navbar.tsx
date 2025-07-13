"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaBars,
  FaArrowRight,
  FaHome,
  FaInfoCircle,
  FaQuestionCircle,
  FaStore,
  FaPhone,
} from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { useCartItemCount } from "@/stores/useCartStore";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const cartCount = useCartItemCount();

  return (
    <section>
      {/* DESKTOP NAV */}
      <nav className="flex justify-between items-center px-20 py-8 fixed top-0 w-full h-[80px] shadow-lg z-50 bg-white max-md:hidden">
        <Link href="/" className="py-2">
          <Image src="/logo.png" width={100} height={100} alt="Logo" />
        </Link>

        <ul className="flex gap-6 items-center">
          <li>
            <Link className="font-semibold hover:text-blue-500" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="font-semibold hover:text-blue-500" href="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="font-semibold hover:text-blue-500" href="/faqs">
              FAQs
            </Link>
          </li>
          <li>
            <Link
              className="font-semibold hover:text-blue-500"
              href="/dashboard"
            >
              Products
            </Link>
          </li>
          <li>
            <Link className="font-semibold hover:text-blue-500" href="/contact">
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/login">
            <button className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">
              Login <FaArrowRight className="inline ml-2" />
            </button>
          </Link>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <nav className="px-4 py-2 md:hidden fixed top-0 w-full shadow-lg z-50 bg-white">
        <Sheet>
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image src="/logo.png" width={80} height={80} alt="Logo" />
            </Link>

            <div className="flex items-center gap-4">
              {/* Cart Icon */}
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <SheetTrigger>
                <FaBars className="text-2xl font-semibold" />
              </SheetTrigger>
            </div>
          </div>

          <SheetContent side="left" className="bg-white">
            <SheetHeader>
              <SheetTitle className="font-bold text-xl">CHITECH</SheetTitle>
              <SheetDescription>
                <ul className="flex flex-col gap-4 mt-16 text-lg">
                  <li className="flex items-center gap-3">
                    <FaHome />
                    <Link
                      href="/"
                      className="font-semibold hover:text-blue-500"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaInfoCircle />
                    <Link
                      href="/about"
                      className="font-semibold hover:text-blue-500"
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaQuestionCircle />
                    <Link
                      href="/faqs"
                      className="font-semibold hover:text-blue-500"
                    >
                      FAQs
                    </Link>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaStore />
                    <Link
                      href="/dashboard"
                      className="font-semibold hover:text-blue-500"
                    >
                      Products
                    </Link>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaPhone />
                    <Link
                      href="/contact"
                      className="font-semibold hover:text-blue-500"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>

                <div className="flex flex-col gap-4 mt-8 items-center">
                  <Link href="/login">
                    <button className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">
                      Login <FaArrowRight className="inline ml-2" />
                    </button>
                  </Link>
                  <Link href="/dashboard">
                    <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition">
                      Explore Deals
                    </button>
                  </Link>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </section>
  );
};

export default Navbar;
