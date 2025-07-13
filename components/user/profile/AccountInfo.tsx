"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import EditAccountModal from "./EditAccountModal";

export default function AccountInfo() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);

  if (!session?.user) return null;

  const initials = session.user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="border rounded p-4 relative">
      <div className="flex items-center gap-4">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
            {initials}
          </div>
        )}
        <div>
          <p className="text-lg font-medium">{session.user.name}</p>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="absolute top-4 right-4 text-sm text-blue-600 hover:underline"
      >
        ✏️ Update Details
      </button>

      {showModal && <EditAccountModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
