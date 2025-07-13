"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import SearchOrder from "./SearchOrder"; // Make sure path is correct

export default function AdminOrderTable({ orders }: { orders: any[] }) {
  const [filteredOrders, setFilteredOrders] = useState(orders);

  // Optional: reset filteredOrders when original orders change
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  return (
    <div>
      <SearchOrder orders={orders} setFilteredOrders={setFilteredOrders} />

      <div className="overflow-auto border rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No matching orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-4 py-3">{order.user?.name || "Unknown"}</td>
                  <td className="px-4 py-3">
                    ₦{order.totalPrice?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 capitalize">
                    {order.paymentMethod}
                  </td>
                  <td className="px-4 py-3 capitalize">{order.status}</td>
                  <td className="px-4 py-3">
                    {format(new Date(order.createdAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
