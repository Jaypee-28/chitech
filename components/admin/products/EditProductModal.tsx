"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-toastify";
import { CategoryType } from "@/types/next-auth";

interface Product {
  _id: string;
  title: string;
  brand?: string;
  price: number;
  stock: number;
  rating: number;
  description: string;
  images: string[];
  category: {
    _id: string;
    name: string;
  };
}

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSuccess: () => void;
}

export default function EditProductModal({
  open,
  onClose,
  product,
  onSuccess,
}: EditProductModalProps) {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
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

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price.toFixed(2));
      setStock(product.stock.toString());
      setRating(product.rating?.toString() || "");
      setBrand(product.brand || "");
      setCategory(product.category?._id || "");
      setDescription(product.description || "");
      setExistingImages(product.images || []);
    }
  }, [product]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...previewUrls];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImageFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
  };

  const handleRemoveExistingImage = (index: number) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/₦|,/g, "");
    if (!isNaN(Number(raw))) {
      setPrice(
        Number(raw).toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
        })
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const parsedPrice = parseFloat(price.replace(/₦|,/g, ""));
    const parsedRating = parseFloat(rating);

    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      toast.error("Rating must be between 0 and 5");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", parsedPrice.toString());
    formData.append("stock", stock);
    formData.append("rating", rating);
    formData.append("category", category);
    if (brand) formData.append("brand", brand);
    existingImages.forEach((url) => formData.append("existingImages", url));
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      setLoading(true);
      await axios.put(`/api/admin/products/${product._id}`, formData);
      toast.success("Product updated successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
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
              className="h-32 resize-none overflow-y-auto"
            />
            <Input
              placeholder="Price"
              value={price}
              onChange={handlePriceChange}
              required
            />
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
            />

            {existingImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {existingImages.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={url}
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(idx)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded hidden group-hover:block"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${idx}`}
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded hidden group-hover:block"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4 pb-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
