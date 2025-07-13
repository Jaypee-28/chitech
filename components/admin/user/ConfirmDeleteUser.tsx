"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

interface ConfirmDeleteUserProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
  onSuccess: () => void;
}

export default function ConfirmDeleteUser({
  open,
  onClose,
  userId,
  onSuccess,
}: ConfirmDeleteUserProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      await axios.delete(`/api/admin/user?id=${userId}`);
      toast.success("User deleted successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
