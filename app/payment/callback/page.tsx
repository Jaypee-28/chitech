"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (!reference) {
      toast.error("Missing payment reference.");
      router.replace("/");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/paystack/verify?reference=${reference}`);
        const data = await res.json();

        if (res.ok) {
          toast.success("Payment successful!");
          router.replace(`/success/${data.orderId}`);
        } else {
          toast.error(data.error || "Payment verification failed");
          router.replace("/payment/failed");
        }
      } catch (err) {
        toast.error("Something went wrong verifying payment");
        router.replace("/payment/failed");
      }
    };

    verifyPayment();
  }, [reference, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">Verifying payment, please wait...</p>
    </div>
  );
}
