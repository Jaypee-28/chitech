"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import AdminOrderStatus from "./AdminOrderStatus";
import { useEffect, useState } from "react";

export default function AdminOrderDetail({ order }: { order: any }) {
  const [currentOrder, setCurrentOrder] = useState(order);
  const router = useRouter();

  const handleStatusUpdate = () => {
    // Refresh the page after status update
    router.refresh();
  };

  return (
    <div className="space-y-4 border p-6 rounded-lg shadow-sm bg-white">
      <h1 className="text-xl font-bold">
        Order #{currentOrder._id.slice(-6).toUpperCase()}
      </h1>

      {/* Customer Info */}
      <div>
        <h2 className="font-semibold mb-1">Customer</h2>
        <p>{currentOrder.user?.name || "Unknown"}</p>
        <p className="text-sm text-gray-500">{currentOrder.user?.email}</p>
      </div>

      {/* Shipping Info */}
      <div>
        <h2 className="font-semibold mb-1">Shipping address</h2>
        <p>{currentOrder.shipping.fullName}</p>
        <p>{currentOrder.shipping.phone}</p>
        <p>
          {currentOrder.shipping.address}, {currentOrder.shipping.city},{" "}
          {currentOrder.shipping.state}
        </p>
      </div>

      {/* Order Info */}
      <div>
        <h2 className="font-semibold mb-1">Order Info</h2>
        <p>
          <span className="font-medium">Total:</span> ₦
          {currentOrder.totalPrice?.toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Payment:</span>{" "}
          {currentOrder.paymentMethod}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span className="capitalize">{currentOrder.status}</span>
        </p>
        <div className="mt-4">
          <label className="font-semibold mr-2">Update Status:</label>
          <AdminOrderStatus
            orderId={currentOrder._id}
            currentStatus={currentOrder.status}
            onUpdate={handleStatusUpdate}
          />
        </div>
        <p className="mt-2">
          <span className="font-medium">Date:</span>{" "}
          {format(new Date(currentOrder.createdAt), "MMM d, yyyy")}
        </p>
      </div>

      {/* Items */}
      <div>
        <h2 className="font-semibold mb-1">Items</h2>
        <div className="divide-y text-sm">
          {currentOrder.items.map((item: any, idx: number) => (
            <div key={idx} className="py-2">
              <p>
                {item.product?.title || "Product not found"} — QTY:{" "}
                {item.quantity}
              </p>
              <p className="text-gray-500 text-xs">
                ₦{item.product?.price?.toLocaleString()} each
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
