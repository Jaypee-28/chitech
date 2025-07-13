"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Star, ShoppingCart } from "lucide-react";
import { useAddToCart } from "@/lib/useAddToCart";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNaira } from "@/lib/format";

interface Product {
  _id: string;
  title: string;
  price: number;
  rating: number;
  images: string[];
  description: string;
}

const LatestProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const handleAddToCart = useAddToCart();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axios.get("/api/user/products/latest?limit=4");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch latest products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <section className="py-12 px-6 lg:px-20 bg-white">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Latest Products</h2>
        <p className="text-gray-500 mt-2">Fresh tech added just for you!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-50 border rounded-md p-4 flex flex-col"
              >
                <Skeleton className="w-full h-48 rounded-md mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))
          : products.map((product) => (
              <div
                key={product._id}
                className="rounded-lg shadow-md p-3 flex flex-col hover:shadow-lg transition bg-white"
              >
                <Link href={`/dashboard/${product._id}`}>
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={product.images?.[0]}
                      alt={product.title}
                      fill
                      className="object-contain h-full w-full rounded-lg"
                    />
                  </div>
                </Link>

                <h3 className="text-md font-semibold text-gray-800 truncate">
                  {product.title}
                </h3>

                <div className="flex items-center gap-1 mt-1 text-yellow-500 text-sm">
                  {Array.from({
                    length: Math.round(product.rating || 0),
                  }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="ml-1 text-gray-600 text-xs">
                    {product.rating?.toFixed(1) || "0.0"}
                  </span>
                </div>

                <p className="mt-2 text-blue-600 font-bold text-lg">
                  {formatNaira(product.price)}
                </p>

                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="mt-4 bg-blue-600 text-white py-2 px-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/dashboard"
          className="inline-block text-blue-600 font-semibold hover:underline"
        >
          Show All Products &rarr;
        </Link>
      </div>
    </section>
  );
};

export default LatestProducts;
