import Footer from "@/components/pages/Footer";
import Navbar from "@/components/pages/Navbar";
import React from "react";
import Image from "next/image";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  FaShippingFast,
  FaShareAlt,
  FaCreditCard,
  FaHeadset,
} from "react-icons/fa";

const page = () => {
  return (
    <section>
      <Navbar />

      <div className="md:px-20 pt-32 max-md:px-4">
        <div className="bg-gray-200 p-16 rounded-4xl">
          <h1 className="text-center text-3xl font-bold">ABOUT US</h1>
        </div>

        <div className="grid grid-cols-2 gap-16 py-16 max-md:grid-cols-1">
          <div className="relative">
            <Image
              src="/about-logo.JPG"
              alt="about image"
              height={400}
              width={400}
              className="rounded-tr-[50px] rounded-bl-[50px]"
            />

            <Image
              src="/IMG_2174.JPG"
              alt="about image 2"
              height={400}
              width={400}
              className="absolute right-0 top-40 rounded-tr-[50px] rounded-bl-[50px] max-md:hidden"
            />
          </div>

          {/* WHO ARE WE */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Who are we</h1>
            <p>
              Founded with a passion for innovation and technology, Chitech
              Global Computers is a trusted name in the world of laptops,
              gadgets and accessories. With many years of experience in laptop
              maintenace and general well-being, we've built a reputation for
              quality, affordability, and reliability.
            </p>
            <p>
              At Chitech Global Computers, we don't just sell gadgets, we
              provide top-quality tech solutions and tools to keep you ahead in
              the digital world. Whether you're a business owner, gamer, or
              student, we ensure you get the best laptops, gadgets, accessories
              and gaming products tailored to your needs.
            </p>
            <p className="font-semibold text-xl">
              We also carry out maintenance, such as;
            </p>
            <div className="flex gap-4 max-md:flex-col">
              <ul className="flex flex-col">
                <li>
                  <AiOutlineCheckCircle className="inline text-blue-700 text-xl" />{" "}
                  Windows Installation
                </li>
                <li>
                  <AiOutlineCheckCircle className="inline text-blue-700 text-xl" />{" "}
                  Software Installation
                </li>
                <li>
                  <AiOutlineCheckCircle className="inline text-blue-700 text-xl" />{" "}
                  Windows Activation
                </li>
                <li>
                  <AiOutlineCheckCircle className="inline text-blue-700 text-xl" />{" "}
                  Screen Replacement
                </li>
              </ul>
              <ul className="flex flex-col">
                <li>
                  <AiOutlineCheckCircle className="inline text-blue-700 text-xl" />{" "}
                  Keyboard Replacement
                </li>
                <li>
                  <AiOutlineCheckCircle className="inline text-blue-700 text-xl" />{" "}
                  Hinge and Case Fixing
                </li>
                <li>
                  <AiOutlineCheckCircle className="inline text-blue-700 text-xl" />{" "}
                  Battery Replacement
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* OUR VISION */}
        <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1 md:py-16 md:mt-8">
          <div className="md:hidden">
            <Image
              src="/IMG_2180.JPG"
              alt="vision image"
              height={300}
              width={350}
              className="h-[500px] rounded-tl-4xl rounded-br-4xl w-[400px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Our Vision</h1>
            <p className="w-full">
              At Chitech Global Computers, we envision a future where technology
              is accessible, reliable, and empowers lives. We strive to be the
              go-to tech hub for business owners, gamers, and individuals who
              need cutting-edge laptops, gadgets and expert maintenance.
            </p>
            <p>
              We believe that technology should not only be a luxury but a
              necessity, one that enhances productivity, fuels creativity, and
              transform businesses. Our vision is to bridge the gap between
              people and tech they need by offering affordable, high quality and
              innovative solutions.
            </p>
            <h1 className="font-bold text-3xl mt-4">Our Mission</h1>
            <p>
              Our mission is simple; To deliver excellence in technology by
              providing premium laptops & gadgets, accessories, tools, unmatched
              customer experience, reliable tech repairs, and a gamer's
              paradise. We are more than just a business, we are a tech
              community built on trust, passion, and relentless pursuit of
              excellence. Every customer, every device and every service we
              provide is a step towards a more connected and inovative future.
            </p>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-2 mt-[55px] max-md:hidden">
              <Image
                src="/IMG_2179.JPG"
                alt="vision image"
                height={200}
                width={150}
                className="ml-[50px] rounded-4xl"
              />
              <Image
                src="/IMG_2173.JPG"
                alt="vision image"
                height={150}
                width={200}
                className="w-[] h-[150] rounded-4xl"
              />
            </div>
            <div>
              <Image
                src="/IMG_2180.JPG"
                alt="vision image"
                height={300}
                width={350}
                className="h-[500px] rounded-4xl max-md:hidden"
              />
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="py-8">
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
              <FaShareAlt className="text-5xl" />
              <h1 className="font-semibold text-2xl">Secured & Reliable</h1>
              <p>
                Shop with confidence! We ensure safe transactions and
                top-quality products, making your experience hassle-free.
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
      </div>

      <Footer />
    </section>
  );
};

export default page;
