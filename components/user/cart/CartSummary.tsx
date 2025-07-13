// components/user/cart/CartSummary.tsx
"use client";

import { useCartStore } from "@/stores/useCartStore";
import Link from "next/link";
import { formatNaira } from "@/lib/format";
import { FaArrowLeft } from "react-icons/fa";

export default function CartSummary() {
  const { items, clearCart } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="rounded-md p-4 bg-white shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Cart Summary</h2>
      <hr className="my-4" />
      <div className="flex justify-between font-semibold text-gray-900 text-sm">
        <span>Total ({totalItems} items):</span>
        <span>{formatNaira(totalPrice)}</span>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <button
          onClick={clearCart}
          className="bg-gray-100 hover:bg-gray-200 text-sm py-2 rounded-md text-gray-800"
        >
          Clear Cart
        </button>

        <Link href="/checkout">
          <button
            disabled={items.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-md disabled:opacity-50"
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>{" "}
      <Link href="/dashboard">
        <p className="text-center mt-4 underline">
          <FaArrowLeft className="inline" />
          Continue shopping
        </p>
      </Link>
    </div>
  );
}
