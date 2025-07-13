// app/admin/categories/CategoryTable.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

interface Category {
  _id: string;
  name: string;
  createdAt: string;
}

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/admin/category");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openEdit = (cat: Category) => {
    setSelectedCategory(cat);
    setEditOpen(true);
  };

  const openDelete = (cat: Category) => {
    setSelectedCategory(cat);
    setDeleteOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button onClick={() => setCreateOpen(true)}>+ New Category</Button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Created At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="border-t">
              <td className="p-2">{cat.name}</td>
              <td className="p-2">
                {new Date(cat.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 flex gap-2">
                <Pencil
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => openEdit(cat)}
                />
                <Trash
                  className="w-4 h-4 text-red-600 cursor-pointer"
                  onClick={() => openDelete(cat)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      <CreateCategoryModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={fetchCategories}
      />

      <EditCategoryModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={fetchCategories}
        category={selectedCategory}
      />

      <DeleteCategoryModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onSuccess={fetchCategories}
        category={selectedCategory}
      />
    </div>
  );
}
