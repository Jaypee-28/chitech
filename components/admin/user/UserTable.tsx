"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import SearchInput from "./SearchUser";
import ConfirmDeleteUser from "./ConfirmDeleteUser";
import SearchUser from "./SearchUser";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/user");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filteredList = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });
    setFiltered(filteredList);
  }, [searchQuery, users]);

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setIsDeleteOpen(false);
  };

  return (
    <Card className="p-6">
      <ConfirmDeleteUser
        open={isDeleteOpen}
        onClose={closeDeleteModal}
        userId={deleteId}
        onSuccess={fetchUsers}
      />

      <div className="sticky top-0 px-4 bg-white z-10 py-4 mb-6 rounded-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-semibold tracking-tight whitespace-nowrap">
            Users
          </h2>
          <div className="flex-1 flex justify-center min-w-[200px]">
            <SearchUser onSearch={setSearchQuery} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <table className="w-full table-auto border border-gray-200 rounded-md text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 border-b text-left">Name</th>
                <th className="px-4 py-3 border-b text-left">Email</th>
                <th className="px-4 py-3 border-b text-left">Role</th>
                <th className="px-4 py-3 border-b text-left">Created</th>
                <th className="px-4 py-3 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 border-b">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteModal(user._id)}
                    >
                      <Trash className="w-4 h-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}
