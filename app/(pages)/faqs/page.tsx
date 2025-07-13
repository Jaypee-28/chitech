import React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/pages/Navbar";
import Footer from "@/components/pages/Footer";

const page = () => {
  return (
    <section>
      <Navbar />
      <div className="px-20 pt-32 max-md:px-4">
        <div className="bg-gray-200 p-16 rounded-4xl">
          <h1 className="text-center text-3xl font-bold">FAQs</h1>
          <p className="text-center font-semibold text-xl">
            Frequently asked questions
          </p>
        </div>

        <div className="grid grid-cols-2 md:gap-16 max-md:grid-cols-1">
          <div>
            <Image src="/ask.png" alt="ask image" width={400} height={400} />
          </div>

          {/* FAQs */}
          <Accordion type="single" collapsible className="w-full mt-16 mr-8">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-xl">
                What products do you sell?
              </AccordionTrigger>
              <AccordionContent>
                We offer a wide range of tech products, including laptops,
                laptop accessories, gaming consoles (PS4 & PS5), and other
                computer-related gadgets.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold text-xl">
                Do you offer nationwide delivery?
              </AccordionTrigger>
              <AccordionContent>
                Yes! We provide fast and reliable delivery across Nigeria.
                Delivery times may vary depending on your location.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold text-xl">
                Can I place an order online and pick it up in-store?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! You can order online and select "Pick Up" at
                checkout. We will notify you when your order is ready for
                pickup.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="font-semibold text-xl">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent>
                We accept various payment methods, including: Debit/Credit
                Cards, Bank Transfers, Mobile Payments, USSD.
              </AccordionContent>
            </AccordionItem>

            {/* <AccordionItem value="item-5">
              <AccordionTrigger className="font-semibold text-xl">
                Do you offer product warranties?
              </AccordionTrigger>
              <AccordionContent>
                Yes! All our products come with a warranty. The duration depends
                on the product and brand. Check the product page for warranty
                details.
              </AccordionContent>
            </AccordionItem> */}

            <AccordionItem value="item-6">
              <AccordionTrigger className="font-semibold text-xl">
                What should I do if I receive a faulty or wrong item?
              </AccordionTrigger>
              <AccordionContent>
                We have a hassle-free return policy. If you receive a defective
                or incorrect item, kindly contact our support team within 48
                hours for a replacement.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default page;
