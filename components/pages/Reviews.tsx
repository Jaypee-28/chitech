"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import AddReviewModal from "./AddReviewModal";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

interface Review {
  name: string;
  message: string;
  rating: number;
}

const CustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const visibleCount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2;

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      toast.error("Failed to load reviews.");
    } finally {
      setIsLoading(false);
    }
  };

  const addReview = (newReview: Review) => {
    setReviews((prev) => [...prev, newReview]);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  useEffect(() => {
    fetchReviews();
  }, []);

  const nextSlide = () => {
    if (reviews.length > 0) {
      setIndex((prev) => (prev + 1) % reviews.length);
    }
  };

  const prevSlide = () => {
    if (reviews.length > 0) {
      setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  const displayed = reviews.slice(index, index + visibleCount);

  return (
    <section className="px-6 lg:px-20 py-16 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
        <Dialog>
          <DialogTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition">
            Add Review
          </DialogTrigger>
          <DialogContent className="max-w-md w-full bg-white max-md:mx-2 p-6 rounded-md shadow-xl">
            <AddReviewModal onSubmit={addReview} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 overflow-hidden">
            {displayed.map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4"
              >
                <p className="text-gray-700 text-sm">“{review.message}”</p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 uppercase">
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reviews.length > visibleCount && (
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full border hover:bg-gray-100 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full border hover:bg-gray-100 transition"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CustomerReviews;
