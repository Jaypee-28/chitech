"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CheckoutHeader() {
  const router = useRouter();

  return (
    <header className="w-full flex items-center gap-4 px-4 py-3 bg-white border-b">
      <button
        onClick={() => router.push("/cart")}
        className="text-gray-600 hover:text-black"
      >
        <ArrowLeft size={20} />
      </button>
      <h2 className="text-lg font-semibold">Checkout</h2>
    </header>
  );
}
