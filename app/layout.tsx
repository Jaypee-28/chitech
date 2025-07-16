import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO & social metadata
export const metadata: Metadata = {
  title: {
    default: "Chitech Global - Laptops, Gadgets & Accessories",
    template: "%s | Chitech Global",
  },
  description:
    "Shop the latest laptops, gadgets, and accessories at Chitech. Affordable tech, fast delivery, and reliable support across Nigeria.",
  keywords: [
    "Chitech",
    "laptops",
    "gadgets",
    "playStations",
    "cctv",
    "accessories",
    "online store",
    "Nigeria",
    "e-commerce",
    "tech shop",
    "tech tools",
    "electronics",
  ],
  authors: [{ name: "Chitech Global" }],
  creator: "Chitech",
  metadataBase: new URL("https://chitechglobal.com.ng"),
  openGraph: {
    title: "Chitech Global - Laptops, Gadgets & Accessories",
    description:
      "Discover top tech deals on laptops, gadgets, and more at Chitech. Fast nationwide delivery and secure payments.",
    url: "https://chitechglobal.com.ng",
    siteName: "Chitech",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chitech Global - Affordable Tech in Nigeria",
    description:
      "Explore the best deals on gadgets and electronics. Chitech delivers fast and securely across Nigeria.",
    creator: "@chitech_ng",
  },
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}
