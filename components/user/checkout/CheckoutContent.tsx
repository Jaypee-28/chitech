"use client";

import { useState } from "react";
import CheckoutHeader from "./CheckoutHeader";
import StepIndicator from "./StepIndicator";
import CheckoutForm from "./CheckoutForm";
import PaymentMethod from "./PaymentMethod";
import CheckoutSummary from "./CheckoutSummary";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CheckoutContent() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { items, clearCart } = useCartStore();
  const router = useRouter();

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);

      const formattedItems = items.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      }));

      const totalAmount =
        formData.deliveryFee +
        items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const shippingInfo = formData.shipping;

      const res = await fetch("/api/user/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: formattedItems,
          totalPrice: totalAmount,
          deliveryType: formData.deliveryType,
          deliveryFee: formData.deliveryFee,
          shipping: shippingInfo,
          paymentMethod: formData.paymentMethod,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Order failed");
      }

      const order = await res.json();

      if (formData.paymentMethod === "paystack") {
        const payRes = await fetch("/api/paystack/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order._id,
            email: shippingInfo?.email || shippingInfo.phone + "@chitech.fake",
            amount: order.totalPrice,
            // amount: totalAmount + formData.deliveryFee, Fetched from backend
          }),
        });

        if (!formData || !formData.paymentMethod) {
          toast.error("Payment method not selected");
          return;
        }

        if (!payRes.ok) throw new Error("Payment initialization failed");

        const payData = await payRes.json();
        window.location.href = payData.authorization_url;
        return;
      }

      toast.success("Order placed successfully!");
      clearCart();
      router.push(`/success/${order._id}`);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-10 bg-gray-50">
      <CheckoutHeader />
      <StepIndicator currentStep={step} />

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          {step === 1 ? (
            <CheckoutForm
              initialData={formData}
              onNext={(data) => {
                setFormData(data);
                setStep(2);
              }}
            />
          ) : (
            <PaymentMethod
              value={formData?.paymentMethod || "paystack"}
              onChange={(method) =>
                setFormData((prev: any) => ({
                  ...(prev || {}),
                  paymentMethod: method,
                }))
              }
              onGoBack={() => setStep(1)}
              isLoading={loading}
            />
          )}
        </div>

        <div className="hidden md:block">
          <CheckoutSummary
            formData={formData}
            onConfirm={handleConfirmOrder}
            isLoading={loading}
          />
        </div>
      </div>

      <div className="md:hidden mt-6">
        <CheckoutSummary
          formData={formData}
          onConfirm={handleConfirmOrder}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
