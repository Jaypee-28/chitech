// components/user/ProductGrid.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProductFilterStore } from "@/stores/useProductFilterStore";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "react-toastify";
import Image from "next/image";
import { formatNaira } from "@/lib/format";
import MobileCategoryBar from "@/components/user/layout/MobileCategoryBar";

interface Product {
  _id: string;
  title: string;
  price: number;
  rating: number;
  images: string[];
  description: string;
}

export default function ProductGrid() {
  const { selectedCategory, selectedBrands, priceRange, searchQuery } =
    useProductFilterStore();
  const { addToCart } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const buildQuery = () => {
    const query = new URLSearchParams();
    if (selectedCategory) query.append("category", selectedCategory);
    if (selectedBrands.length > 0)
      selectedBrands.forEach((b) => query.append("brands", b));
    query.append("min", priceRange[0].toString());
    query.append("max", priceRange[1].toString());
    if (searchQuery) query.append("search", searchQuery);
    return query.toString();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/user/products?${buildQuery()}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedBrands, priceRange, searchQuery]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      description: product.description,
      quantity: 1,
    });
    toast.success(`${product.title} added to cart! 🎉`);
  };

  return (
    <section>
      <div className="md:hidden">
        <MobileCategoryBar />
      </div>
      <div className="p-4">
        {isLoading ? (
          <p className="text-center text-sm text-gray-500">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/dashboard/${product._id}`}
                className="rounded-lg shadow-md p-3 flex flex-col hover:shadow-lg transition bg-white"
              >
                {/* Image container */}
                <div className="w-full h-48 flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="object-contain h-full w-full rounded-lg"
                  />
                </div>

                <h3 className="font-semibold text-gray-800 text-sm truncate">
                  {product.title}
                </h3>
                <p className="text-blue-600 font-bold text-lg">
                  {formatNaira(product.price)}
                </p>
                <p className="text-yellow-500 text-sm mb-2">
                  ⭐ {product.rating?.toFixed(1) ?? "0.0"}
                </p>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md"
                >
                  Add to Cart
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
