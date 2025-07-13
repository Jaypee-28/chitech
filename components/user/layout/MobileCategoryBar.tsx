"use client";

import {
  FaCamera,
  FaGamepad,
  FaLaptop,
  FaHeadphones,
  FaMobileAlt,
} from "react-icons/fa";

const categories = [
  { label: "Laptops", icon: FaLaptop },
  { label: "Camera", icon: FaCamera },
  { label: "Gadgets", icon: FaMobileAlt },
  { label: "Accessories", icon: FaHeadphones },
  { label: "Games", icon: FaGamepad },
];

export default function MobileCategoryBar() {
  return (
    <section>
      <div className="py-2 bg-blue-600 rounded-full">
        <h1 className="text-center text-white">
          Call to Order: +234 903 847 8789
        </h1>
      </div>
      <div className="md:hidden bg-white px-2 py-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3">
          {categories.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center min-w-[80px] rounded-lg border px-4 py-3 bg-white"
            >
              <Icon className="text-black text-2xl mb-2" />
              <span className="text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
