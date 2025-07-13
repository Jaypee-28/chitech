"use client";

import { useEffect } from "react";
import { useCartStore } from "@/stores/useCartStore";
import { format } from "date-fns";
import Link from "next/link";
import { formatNaira } from "@/lib/format";

export default function SuccessPageClient({
  order,
  userName,
}: {
  order: any;
  userName: string;
}) {
  useEffect(() => {
    const { clearCart } = useCartStore.getState();
    clearCart();
  }, []);

  const getEta = () => {
    if (!order?.deliveryType || order.deliveryType === "pickup") return null;

    const created = new Date(order.createdAt);
    const start = new Date(created);
    const end = new Date(created);

    if (order.deliveryType === "standard") {
      start.setDate(start.getDate() + 6);
      end.setDate(end.getDate() + 7);
    } else if (order.deliveryType === "express") {
      start.setDate(start.getDate() + 2);
      end.setDate(end.getDate() + 3);
    }

    const formatDate = (date: Date) => format(date, "MMM d");

    return `${formatDate(start)} – ${formatDate(end)}`;
  };

  const eta = getEta();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md text-center">
        <div className="text-green-500 text-5xl mb-3">✅</div>
        <h2 className="text-2xl font-bold mb-2">
          Thank you {userName?.split(" ")[0]} for your order!
        </h2>
        <p className="text-gray-600 mb-6">
          Your order was placed successfully. We'll notify you once it's on the
          way.
        </p>

        <div className="bg-gray-100 p-4 rounded text-sm text-left space-y-1 mb-6">
          <p>
            <span className="font-semibold">Order ID:</span> #
            {order._id?.slice(-6).toUpperCase()}
          </p>
          <p>
            <span className="font-semibold">Amount:</span>{" "}
            {formatNaira(order.totalPrice)}
          </p>
          <p>
            <span className="font-semibold">Payment:</span>{" "}
            {order.paymentMethod}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{order.status}</span>
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {format(new Date(order.createdAt), "MMM d, yyyy")}
          </p>
          {eta && (
            <p>
              <span className="font-semibold">Estimated Delivery:</span> {eta}
            </p>
          )}
        </div>

        <div className="flex gap-3 justify-center">
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Continue Shopping
          </Link>
          <Link
            href={`/dashboard/orders/${order._id}`}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded"
          >
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
}
