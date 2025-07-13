"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Star } from "lucide-react";

interface Review {
  name: string;
  message: string;
  rating: number;
}

interface Props {
  onSubmit: (review: Review) => void;
}

const AddReviewModal = ({ onSubmit }: Props) => {
  const [form, setForm] = useState({ name: "", message: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.message) {
      return toast.error("Please fill all fields.");
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/user/reviews", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        onSubmit(form);
        toast.success("Review submitted!");
        setForm({ name: "", message: "", rating: 5 });
      } else {
        toast.error("Failed to submit review.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium text-sm mb-1">Your Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block font-medium text-sm mb-1">Your Review</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          placeholder="Write your feedback here"
        />
      </div>

      <div>
        <label className="block font-medium text-sm mb-1">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              onClick={() => setForm({ ...form, rating: num })}
              className={`w-6 h-6 cursor-pointer ${
                form.rating >= num
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default AddReviewModal;
