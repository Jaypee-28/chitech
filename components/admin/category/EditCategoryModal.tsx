// app/admin/categories/EditCategoryModal.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: {
    _id: string;
    name: string;
  } | null;
}

export default function EditCategoryModal({
  open,
  onClose,
  onSuccess,
  category,
}: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) setName(category.name);
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setLoading(true);
      await axios.put(`/api/admin/category/${category?._id}`, { name });
      toast.success("Category updated");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white"
          >
            {loading ? "Saving..." : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
