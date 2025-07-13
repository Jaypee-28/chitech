"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ChangePasswordModal() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current, newPass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast("Password updated!");
      setCurrent("");
      setNewPass("");
    } catch (err: any) {
      toast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <div className="mb-4">
        <label className="block text-sm mb-1">Current Password</label>
        <input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">New Password</label>
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <button
        onClick={handleChange}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
}
