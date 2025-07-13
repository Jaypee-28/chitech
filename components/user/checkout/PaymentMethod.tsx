"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { FaCreditCard, FaUniversity, FaBarcode } from "react-icons/fa";
import { SiOpensea } from "react-icons/si"; // using this for Opay

type Props = {
  value: string;
  onChange: (method: string) => void;
  onGoBack: () => void;
  isLoading: boolean;
};

const paymentOptions = [
  {
    label: "Pay with Card",
    icon: <FaCreditCard size={20} />,
    value: "card",
  },
  {
    label: "Bank Transfer",
    icon: <FaUniversity size={20} />,
    value: "transfer",
  },
  {
    label: "USSD",
    icon: <FaBarcode size={20} />,
    value: "ussd",
  },
  {
    label: "OPay",
    icon: <SiOpensea size={20} />,
    value: "opay",
  },
];

export default function PaymentMethod({
  value,
  onChange,
  onGoBack,
  isLoading,
}: Props) {
  const [selected, setSelected] = useState(value || "card");

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = (channel: string) => {
    setSelected(channel);
    onChange("paystack"); // Currently hardcoded to Paystack
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 md:ml-16">
      <button
        onClick={onGoBack}
        className="text-sm text-blue-600 underline hover:text-blue-800 mb-4"
      >
        ← Modify Shipping Info
      </button>

      <h2 className="text-lg font-semibold">Select Payment Method</h2>
      <p className="text-sm text-gray-600">
        You will be redirected to our secure payment page.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {paymentOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            disabled={isLoading}
            onClick={() => handleSelect(option.value)}
            className={clsx(
              "flex items-center gap-3 p-3 border rounded-md transition-all duration-200 text-left",
              selected === option.value
                ? "border-black bg-gray-100"
                : "border-gray-300 hover:border-black"
            )}
          >
            <span className="text-xl text-gray-800">{option.icon}</span>
            <div>
              <p className="font-medium">{option.label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
