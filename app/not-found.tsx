// app/not-found.tsx or pages/404.tsx

import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9ff] px-4 text-center">
      <Image
        src="/404.jpg"
        alt="404"
        width={300}
        height={300}
        className="mb-6"
      />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        404 Page not found
      </h1>
      <p className="text-gray-600 max-w-md mb-6 text-sm">
        The page you are looking for does not exist, or it's temporarily
        unavailable.
      </p>

      <Link href="/">
        <button className="px-6 py-2 rounded-md bg-[#6C63FF] text-white font-semibold shadow hover:bg-indigo-600 transition">
          GO TO HOME
        </button>
      </Link>
    </section>
  );
}
