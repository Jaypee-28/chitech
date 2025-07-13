"use client";

import { useCartStore } from "@/stores/useCartStore";
import { formatNaira } from "@/lib/format";

type Props = {
  onConfirm: () => void;
  isLoading: boolean;
  formData?: {
    shipping?: {
      fullName: string;
      phone: string;
      address: string;
      state: string;
      city: string;
    };
    paymentMethod?: string;
    deliveryType?: string;
    deliveryFee?: number;
  };
};

export default function CheckoutSummary({
  onConfirm,
  isLoading,
  formData,
}: Props) {
  const { items } = useCartStore();

  const isFormFilled =
    formData?.shipping?.fullName &&
    formData.shipping.phone &&
    formData.shipping.address &&
    formData.shipping.state &&
    formData.shipping.city &&
    formData.paymentMethod &&
    formData.deliveryType &&
    formData.deliveryFee != null;

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = formData?.deliveryFee ?? 0;
  const totalWithDelivery = itemsTotal + deliveryFee;

  // ✅ Calculate ETA based on deliveryType
  const getEstimatedDelivery = () => {
    if (!formData?.deliveryType || formData.deliveryType === "pickup")
      return null;

    const now = new Date();
    let startDate = new Date(now);
    let endDate = new Date(now);

    if (formData.deliveryType === "standard") {
      startDate.setDate(startDate.getDate() + 6);
      endDate.setDate(endDate.getDate() + 7);
    } else if (formData.deliveryType === "express") {
      startDate.setDate(startDate.getDate() + 2);
      endDate.setDate(endDate.getDate() + 3);
    }

    const format = (date: Date) =>
      date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });

    return `${format(startDate)} - ${format(endDate)}`;
  };

  const eta = getEstimatedDelivery();

  return (
    <div className="rounded-md shadow-lg p-4 bg-white md:mr-16 max-md:mx-2">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Order Summary
      </h2>

      {/* PRODUCT LIST */}
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.productId}
            className="text-sm text-gray-700 border-b pb-2"
          >
            <div className="font-medium">{item.title}</div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>QTY: {item.quantity}</span>
              <span>₦{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      {/* COST BREAKDOWN */}
      <div className="text-sm text-gray-700 space-y-2">
        <div className="flex justify-between">
          <span>Items Total:</span>
          <span>{formatNaira(itemsTotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>
            Delivery{" "}
            {formData?.deliveryType ? `(${formData.deliveryType})` : "(N/A)"}:
          </span>
          <span>
            {formData?.deliveryFee != null
              ? formatNaira(formData.deliveryFee)
              : "N/A"}
          </span>
        </div>

        {eta && (
          <div className="flex justify-between text-blue-700 font-medium">
            <span>Estimated Delivery:</span>
            <span>{eta}</span>
          </div>
        )}
      </div>

      <hr className="my-4" />

      {/* GRAND TOTAL */}
      <div className="flex justify-between font-semibold text-gray-900">
        <span>Total:</span>
        <span>{formatNaira(totalWithDelivery)}</span>
      </div>

      <button
        onClick={onConfirm}
        disabled={!isFormFilled || isLoading}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Confirm Order"}
      </button>
    </div>
  );
}
