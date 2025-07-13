// components/user/cart/CartItem.tsx
"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

export default function CartItem({ item }: { item: any }) {
  const { addToCart, removeFromCart } = useCartStore();

  const increaseQty = () => addToCart(item);

  const decreaseQty = () => {
    const current = item;
    if (current.quantity === 1) {
      removeFromCart(current.productId);
    } else {
      const updated = { ...current, quantity: current.quantity - 1 };
      removeFromCart(current.productId);
      useCartStore.getState().addToCart(updated);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center shadow-lg rounded-md p-4 bg-white">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1 w-full">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {item.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {item.description || "No description available."}
        </p>
        <p className="text-sm text-blue-600 font-semibold mt-1">
          ₦{item.price.toLocaleString()}
        </p>
        <p className="text-xs mt-1 text-gray-500">QTY: {item.quantity}</p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={decreaseQty}
            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm">{item.quantity}</span>
          <button
            onClick={increaseQty}
            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <Plus size={14} />
          </button>
          <button
            onClick={() => removeFromCart(item.productId)}
            className="ml-4 p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
