// app/admin/categories/DeleteCategoryModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: {
    _id: string;
    name: string;
  } | null;
}

export default function DeleteCategoryModal({
  open,
  onClose,
  onSuccess,
  category,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!category) return;
    try {
      setLoading(true);
      await axios.delete(`/api/admin/category/${category._id}`);
      toast.success("Category deleted");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-sm text-gray-700">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{category?.name}</span>? This action
          cannot be undone.
        </div>
        <div className="flex justify-end gap-2">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
