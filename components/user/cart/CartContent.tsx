// components/user/cart/CartContent.tsx
"use client";

import { useCartStore } from "@/stores/useCartStore";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartContent() {
  const { items } = useCartStore();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-10 mt-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>

          {/* Cart Summary - Desktop */}
          <div className="hidden md:block">
            <CartSummary />
          </div>
        </div>
      )}

      {/* Cart Summary - Mobile */}
      {items.length > 0 && (
        <div className="md:hidden mt-8">
          <CartSummary />
        </div>
      )}
    </div>
  );
}
