import React from "react";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="md:px-20 mt-16">
      {/* FOOTER */}
      <div className="bg-gray-200 rounded-t-[50px] py-12 ">
        <div className=" flex justify-between px-16 max-md:flex-col max-md:gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl">Chitech Global</h1>
            <p className="max-w-[500px]">
              At Chitech Global Computers, we provide high-quality laptops,
              accessories, and gaming products. With trusted brands, secure
              payments, and fast delivery, we make tech shopping seamless for
              businesses and individuals.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl">Quick Links</h1>
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/about">
              <li>About</li>
            </Link>
            <Link href="/faqs">
              <li>FAQs</li>
            </Link>
            <Link href="dashboard">
              <li>Products</li>
            </Link>
            <Link href="contact">
              <li>Contact</li>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl">Contact Us</h1>
            <p>
              <MdEmail className="inline text-xl" /> support@chitechglobal.com
            </p>
            <p>
              <FiPhone className="inline text-xl" /> +234 903 847 8789
            </p>
            <p>
              <FaLocationDot className="inline text-xl" /> No. 75 Njemanze
              street, Owerri
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl">Socials</h1>
            <div className="flex gap-2">
              <FaWhatsapp />
              <FaFacebook />
              <FaInstagram />
              <FaTiktok />
            </div>
          </div>
        </div>

        <div className=" mt-16 pt-6 border-t border-gray-600">
          <div className="text-center mt-4">
            <p>
              &copy; 2025{" "}
              <span className="italic font-semibold">Chitech Global</span>. All
              right reserved.
            </p>
            <p>
              Developed by{" "}
              <a
                href="https://jaypee.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Jaypee
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
