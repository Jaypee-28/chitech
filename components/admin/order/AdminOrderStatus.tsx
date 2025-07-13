"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

const statusOptions = [
  "pending",
  "paid",
  "delivered",
  "cancelled",
  "refunded",
  "failed",
];

export default function AdminOrderStatus({
  orderId,
  currentStatus,
  onUpdate,
}: {
  orderId: string;
  currentStatus: string;
  onUpdate?: () => void; // <-- Optional callback
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/order/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const data = await res.json();
      setStatus(data.status);
      toast.success("Order status updated!");

      // Trigger reload if callback exists
      onUpdate?.();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      className="border px-3 py-2 rounded bg-white text-sm"
    >
      {statusOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
