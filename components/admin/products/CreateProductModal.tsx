"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-toastify";
import { CategoryType } from "@/types/next-auth";

const formatNaira = (value: string) => {
  const number = parseFloat(value.replace(/[^\d.]/g, ""));
  if (isNaN(number)) return "";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(number);
};

const parseNaira = (formatted: string) => {
  return formatted.replace(/[^\d.]/g, "");
};

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateProductModal({
  open,
  onClose,
  onSuccess,
}: CreateProductModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (!open) return;
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/admin/category");
        setCategories(res.data);
      } catch {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...imageFiles, ...files];
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImageFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }

    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      toast.error("Rating must be between 0 and 5");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("rating", rating);
    formData.append("category", category);
    if (brand) formData.append("brand", brand);
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      setLoading(true);
      await axios.post("/api/admin/products", formData);
      toast.success("Product created successfully!");
      onSuccess();
      onClose();

      setTitle("");
      setDescription("");
      setPrice("");
      setStock("");
      setRating("");
      setBrand("");
      setCategory("");
      setImageFiles([]);
      setPreviewUrls([]);
    } catch (err) {
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="bg-white shadow-lg border rounded-lg max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[75vh] pr-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="resize-none max-h-24"
            />
            <Input
              placeholder="Price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={() => {
                const parsed = parseFloat(price.replace(/[^\d.]/g, ""));
                if (!isNaN(parsed)) {
                  setPrice(parsed.toFixed(2));
                }
              }}
              required
            />
            {price && (
              <p className="text-sm text-gray-500">
                Formatted: <strong>{formatNaira(price)}</strong>
              </p>
            )}
            <Input
              placeholder="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
            <Input
              placeholder="Rating (0 - 5)"
              type="number"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
            <Input
              placeholder="Brand (optional)"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              required
            />
            {previewUrls.length > 0 && (
              <div className="flex gap-2 overflow-x-auto">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={url}
                      alt={`Preview ${idx}`}
                      className="w-full h-full object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newFiles = imageFiles.filter((_, i) => i !== idx);
                        const newPreviews = previewUrls.filter(
                          (_, i) => i !== idx
                        );
                        setImageFiles(newFiles);
                        setPreviewUrls(newPreviews);
                      }}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center -mt-1 -mr-1"
                      title="Remove"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white"
            >
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
