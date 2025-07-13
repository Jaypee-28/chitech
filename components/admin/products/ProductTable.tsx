"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash } from "lucide-react";
import axios from "axios";
import CreateProductModal from "./CreateProductModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditProductModal from "./EditProductModal";
import { toast } from "sonner";
import SearchInput from "./SearchInput";
import { formatNaira } from "@/lib/format";

interface Product {
  _id: string;
  title: string;
  price: number;
  stock: number;
  description?: string;
  category: {
    _id: string;
    name: string;
  };
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search filter
  useEffect(() => {
    const filteredList = products.filter((product) => {
      const title = product.title.toLowerCase();
      const description = product.description?.toLowerCase() || "";
      const category = product.category?.name.toLowerCase() || "";
      const query = searchQuery.toLowerCase();

      return (
        title.includes(query) ||
        description.includes(query) ||
        category.includes(query)
      );
    });

    setFiltered(filteredList);
  }, [searchQuery, products]);

  // DELETE
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setIsDeleteOpen(false);
  };

  // EDIT
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEditModal = (product: Product) => {
    setEditProduct(product);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setEditProduct(null);
    setIsEditOpen(false);
  };

  return (
    <Card className="p-0 h-[calc(100vh-150px)] overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white p-6 border-b">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-semibold tracking-tight whitespace-nowrap">
              Products
            </h2>
            <div className="flex-1 flex justify-center min-w-[200px]">
              <SearchInput onSearch={setSearchQuery} />
            </div>
            <Button
              onClick={handleOpen}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Scrollable Table Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <table className="w-full table-auto border border-gray-200 rounded-md text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-200 text-left">
                    Title
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-left">
                    Price
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-left">
                    Stock
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-left">
                    Category
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="px-4 py-3">{product.title}</td>
                    <td className="px-4 py-3">{formatNaira(product.price)}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      {product.category?.name || "No category"}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(product)}
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteModal(product._id)}
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
      </div>

      <CreateProductModal
        open={isModalOpen}
        onClose={handleClose}
        onSuccess={fetchProducts}
      />

      <ConfirmDeleteModal
        open={isDeleteOpen}
        onClose={closeDeleteModal}
        productId={deleteId}
        onSuccess={fetchProducts}
      />

      <EditProductModal
        open={isEditOpen}
        onClose={closeEditModal}
        product={editProduct}
        onSuccess={fetchProducts}
      />
    </Card>
  );
}
