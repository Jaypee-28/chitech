"use client";

import Image from "next/image";

const brands = [
  { name: "HP", logo: "/brands/hp.png" },
  { name: "Apple", logo: "/brands/apple2.png" },
  { name: "Dell", logo: "/brands/dell.jpg" },
  { name: "PlayStation", logo: "/brands/playstation.jpg" },
  { name: "JBL", logo: "/brands/jbl.png" },
  { name: "Lenovo", logo: "/brands/lenovo.png" },
  { name: "Samsung", logo: "/brands/samsung2.png" },
  { name: "Asus", logo: "/brands/asus.png" },
  { name: "Starlink", logo: "/brands/starlink.png" },
];

const BrandScroller = () => {
  return (
    <section className="overflow-hidden py-10 bg-gray-50 ">
      <div className="animate-marquee flex items-center gap-12 min-w-full w-max px-6">
        {brands.map((brand, idx) => (
          <div
            key={idx}
            className="relative w-28 h-12 flex-shrink-0 grayscale hover:grayscale-0 transition"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              className="object-contain"
            />
          </div>
        ))}

        {/* Duplicate the same logos for seamless loop */}
        {brands.map((brand, idx) => (
          <div
            key={`dup-${idx}`}
            className="relative w-28 h-12 flex-shrink-0 grayscale hover:grayscale-0 transition"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandScroller;
