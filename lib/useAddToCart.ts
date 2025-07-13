// lib/useAddToCart.ts
"use client";

import { toast } from "react-toastify";
import { useCartStore } from "@/stores/useCartStore";

interface Product {
  _id: string;
  title: string;
  price: number;
  rating: number;
  images: string[];
  description: string;
}

export const useAddToCart = () => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();

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

  return handleAddToCart;
};
