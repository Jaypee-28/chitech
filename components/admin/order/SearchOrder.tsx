"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Props {
  orders: any[];
  setFilteredOrders: (orders: any[]) => void;
}

export default function SearchOrder({ orders, setFilteredOrders }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const normalizedQuery = query.toLowerCase().trim();

    const filtered = orders.filter((order) => {
      const orderId = order._id?.toString()?.slice(-6).toLowerCase();
      const customerName = order.user?.name?.toLowerCase() || "";
      const customerEmail = order.user?.email?.toLowerCase() || "";
      const status = order.status?.toLowerCase() || "";
      const payment = order.paymentMethod?.toLowerCase() || "";
      const trackingId = order.trackingId?.toLowerCase() || "";
      const date = format(
        new Date(order.createdAt),
        "MMM d, yyyy"
      ).toLowerCase();

      return (
        orderId.includes(normalizedQuery) ||
        customerName.includes(normalizedQuery) ||
        customerEmail.includes(normalizedQuery) ||
        status.includes(normalizedQuery) ||
        payment.includes(normalizedQuery) ||
        trackingId.includes(normalizedQuery) ||
        date.includes(normalizedQuery)
      );
    });

    setFilteredOrders(filtered);
  }, [query, orders, setFilteredOrders]);

  return (
    <div className="mb-6 w-full">
      <input
        type="text"
        placeholder="Search by name, email, order ID, status, payment, tracking, date..."
        className="w-full px-4 py-2 border rounded-md shadow-sm text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
