"use client";

import Footer from "@/components/pages/Footer";
import React from "react";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Navbar from "@/components/pages/Navbar";

const page = () => {
  return (
    <section>
      <Navbar />
      <div className="md:px-20 pt-32 max-md:px-4">
        <div className="bg-gray-200 p-16 rounded-4xl">
          <h1 className="text-center text-3xl font-bold">Contact US</h1>
          <p className="text-center font-semibold text-xl">
            Have anything to say to us? Contact us immediately or visit us
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 py-16 max-md:grid-cols-1">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-4xl">Get In Touch</h1>
            <p className="text-xl font-semibold">
              You can visit or contact us using our details below;
            </p>

            <div className="flex gap-4 items-center">
              <h1 className="bg-blue-700 p-4 rounded-full">
                {" "}
                <FaLocationDot className="text-white text-xl" />{" "}
              </h1>
              <div className="flex flex-col">
                <h1 className="font-bold text-xl">Address</h1>
                <p>NO. 71 Njemanze Street, Owerri, Imo State.</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <h1 className="bg-blue-700 p-4 rounded-full">
                {" "}
                <MdEmail className="text-white text-xl" />{" "}
              </h1>
              <div className="flex flex-col">
                <h1 className="font-bold text-xl">Email</h1>
                <p>support@chitechglobal.com</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <h1 className="bg-blue-700 p-4 rounded-full">
                {" "}
                <FiPhone className="text-white text-xl" />{" "}
              </h1>
              <div className="flex flex-col">
                <h1 className="font-bold text-xl">Phone</h1>
                <p>+234 903 847 8789</p>
              </div>
            </div>

            <div className="mt-8 py-8 border-t border-gray-600">
              <h1 className="font-bold text-xl">Follow Us:</h1>
              <div className="flex gap-4 mt-2">
                <h1 className="bg-blue-700 p-4 rounded-full">
                  {" "}
                  <FaFacebook className="text-white text-xl" />{" "}
                </h1>
                <h1 className="bg-blue-700 p-4 rounded-full">
                  {" "}
                  <FaInstagram className="text-white text-xl" />{" "}
                </h1>
                <h1 className="bg-blue-700 p-4 rounded-full">
                  {" "}
                  <FaWhatsapp className="text-white text-xl" />{" "}
                </h1>
                <h1 className="bg-blue-700 p-4 rounded-full">
                  {" "}
                  <FaTiktok className="text-white text-xl" />{" "}
                </h1>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 rounded-2xl md:px-16 px-2 py-8">
            <h1 className="font-bold text-3xl">Send us a message</h1>

            <div className="flex flex-col mt-4">
              <label htmlFor="" className="font-semibold text-xl">
                Full name:
              </label>
              <input
                type="text"
                className="py-2 border-b border-gray-600"
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="" className="font-semibold text-xl">
                Email:
              </label>
              <input
                type="text"
                className="py-2 border-b border-gray-600"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="" className="font-semibold text-xl">
                Message:
              </label>
              <input
                type="text"
                className="py-8  border-b border-gray-600"
                placeholder="Enter your message"
              />
            </div>

            <p>
              By submitting, you agree to the processing of your personal data
              by us as described in the privacy statement.
            </p>

            <button className="py-2 px-6 text-white bg-blue-700 rounded-4xl">
              Submit
            </button>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.5160301532337!2d7.0326118!3d5.490096100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043a94ad56ca1ff%3A0x7f3cfac7e649760a!2sChitech%20Global%20Computers%20and%20Gadgets!5e0!3m2!1sen!2sng!4v1742783990483!5m2!1sen!2sng"
          width="100%"
          height="450"
          style={{ border: "5px solid blue", borderRadius: "20px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </section>
  );
};

export default page;
