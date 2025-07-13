"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  productId: string | null;
  onSuccess: () => void;
}

export default function ConfirmDeleteModal({
  open,
  onClose,
  productId,
  onSuccess,
}: ConfirmDeleteModalProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      await axios.delete(`/api/admin/products/${productId}`);
      toast.success("Product deleted successfully");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>Confirm Delete</DialogHeader>
        <p>
          Are you sure you want to delete this product? This action is
          irreversible.
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
