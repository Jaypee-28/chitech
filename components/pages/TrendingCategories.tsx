"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Laptops",
    image: "/cate-lap.JPG",
    href: "/dashboard",
  },
  {
    name: "PlayStations",
    image: "/pes.jpg",
    href: "/dashboard",
  },
  {
    name: "Gadgets & Accessories",
    image: "/usb.jpeg",
    href: "/dashboard",
  },
  {
    name: "CCTV Cameras",
    image: "/camera.jpg",
    href: "/dashboard",
  },
];

const TrendingCategories = () => {
  return (
    <section className="px-6 lg:px-20 py-12 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 ">
        Trending Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, idx) => (
          <Link
            key={idx}
            href={category.href}
            className="group block rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="w-full h-48 relative">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain h-full w-full rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center bg-white">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingCategories;
