"use client";

import { useEffect } from "react";
import { useCartStore } from "@/stores/useCartStore";
import Link from "next/link";

export default function SuccessPageClient({ userName }: { userName: string }) {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart(); // ✅ Clear cart after successful payment
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold mb-4">
        Thank you for your order, {userName}!
      </h1>
      <p className="text-gray-600 mb-6">We appreciate your patronage.</p>
      <div className="flex gap-4">
        <Link
          href="/dashboard/orders"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Order History
        </Link>
        <Link
          href="/products"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
