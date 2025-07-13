// app/product/[id]/page.tsx
"use client";

import { useCartStore } from "@/stores/useCartStore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { formatNaira } from "@/lib/format";

interface Product {
  _id: string;
  title: string;
  price: number;
  rating: number;
  description: string;
  images: string[]; // assuming it's an array of image URLs
  category: {
    name: string;
  };
}

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setMainImage(data.images?.[0] || data.image || null);
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || "", // fallback
      description: product.description,
      quantity: 1,
    });
    toast.success(`${product.title} added to cart! 🎉`);
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-sm text-gray-500">Loading...</div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500">Product not found.</div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-md shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image section */}
        <div>
          {mainImage && (
            <img
              src={mainImage}
              alt={product.title}
              className="object-contain h-48 w-48"
            />
          )}
          {/* Thumbnails */}
          <div className="flex gap-2 mt-4">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setMainImage(img)}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${
                  img === mainImage ? "border-blue-600" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details section */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold text-blue-600">
            {formatNaira(product.price)}
          </p>
          <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>
          <p className="text-sm text-gray-500">
            Category: {product.category?.name || "Uncategorized"}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
