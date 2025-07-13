"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/pages/Footer";
import Navbar from "@/components/pages/Navbar";
import Image from "next/image";
import TrendingCategories from "@/components/pages/TrendingCategories";
import BrandScroller from "@/components/pages/BrandScroller";
import LatestProducts from "@/components/pages/LatestProducts";
import { CheckCircle } from "lucide-react";
import {
  FaShippingFast,
  FaCreditCard,
  FaShareAlt,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";
import CustomerReviews from "@/components/pages/Reviews";

const Home = () => {
  const sliderImages = ["/graphix.JPG", "/pes5.jpg", "/cctv.jpg"];

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % sliderImages.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <section>
      <Navbar />

      <header className="w-full bg-gray-50 mt-[90px] py-12 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Text */}
        <div className="max-w-xl space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
            Chitech Global Computers <br />
            <h3 className="text-xl font-semibold">
              ...The quality that befits you
            </h3>{" "}
            <br />
            <span className="text-blue-600 text-xl md:text-2xl">
              Laptops | Gadgets | PlayStations
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Explore top-notch tech products tailored to your style and budget.
            Get the best deals on laptops, smart gadgets, and more.
          </p>
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Shop Now
            </Link>
            <Link
              href="/register"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Right Image Slider */}
        <div className="w-full max-w-xl h-[350px] rounded-lg overflow-hidden shadow-md relative">
          {sliderImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Hero slide ${index + 1}`}
              width={800}
              height={500}
              priority={index === 0}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                current === index && fade ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </header>

      <TrendingCategories />

      <BrandScroller />

      <LatestProducts />

      {/* WHY CHOOSE US */}
      <div className="py-8 md:px-20 max-md:px-4">
        <h1 className="font-bold text-3xl text-center">Why Choose Us</h1>

        <div className="grid grid-cols-4 gap-8 mt-8 max-md:grid-cols-1">
          <div className="flex flex-col items-center gap-2 shadow-xl rounded-lg p-4">
            <FaShippingFast className="text-5xl" />
            <h1 className="font-semibold text-2xl">Fast Delivery</h1>
            <p>
              Get your orders delivered quickly and efficiently. We prioritize
              speed so you can start using your tech products ASAP!
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 shadow-xl rounded-lg p-4">
            <FaCreditCard className="text-5xl" />
            <h1 className="font-semibold text-2xl">Easy Payment</h1>
            <p>
              Choose from multiple payment options, including bank transfer,
              card payments, and USSD for convenience.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 shadow-xl rounded-lg p-4">
            <FaShieldAlt className="text-5xl" />
            <h1 className="font-semibold text-2xl">Secured & Reliable</h1>
            <p>
              Shop with confidence! We ensure safe transactions and top-quality
              products, making your experience hassle-free.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 shadow-xl rounded-lg p-4">
            <FaHeadset className="text-5xl" />
            <h1 className="font-semibold text-2xl">Customer Support</h1>
            <p>
              Have a question? Need help? Our support team is always ready to
              assist you with any inquiries.
            </p>
          </div>
        </div>
      </div>

      <CustomerReviews />

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl py-16 px-6 lg:px-20 mx-4 md:mx-20 my-20 text-center shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Try Us Today — Quality Delivered to Your Doorstep
        </h2>

        <div className="flex justify-center gap-6 flex-wrap text-sm text-white/90 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-white" />
            Fast & Secure Checkout
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-white" />
            Trusted Gadget Brands
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-white" />
            Friendly Support Always
          </div>
        </div>

        <div className="flex justify-center gap-4 flex-wrap mt-4">
          <Link
            href="/dashboard"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Home;
