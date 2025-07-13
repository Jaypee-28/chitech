"use client";

import { useEffect, useState } from "react";
import StateSelect from "./StateSelect";
import axios from "axios";
import { formatNaira } from "@/lib/format";

type Props = {
  onNext: (data: any) => void;
  initialData?: {
    shipping: {
      fullName: string;
      phone: string;
      email: string;
      address: string;
      state: string;
      city: string;
    };
    deliveryType: string;
    deliveryFee: number;
    paymentMethod: string;
  };
};

export default function CheckoutForm({ onNext, initialData }: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [deliveryType, setDeliveryType] = useState("standard");
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [loadingFee, setLoadingFee] = useState(false);

  const isPickupAvailable = state.toLowerCase() === "imo";
  const isPickupSelected = deliveryType === "pickup";

  const isFormValid =
    fullName &&
    phone &&
    email &&
    address &&
    state &&
    (isPickupSelected ? city : city) && // always require city
    deliveryFee !== null;

  useEffect(() => {
    if (initialData) {
      const shipping = initialData.shipping || {};
      setFullName(shipping.fullName || "");
      setPhone(shipping.phone || "");
      setEmail(shipping.email || "");
      setAddress(shipping.address || "");
      setState(shipping.state || "");
      setCity(shipping.city || "");
      setDeliveryType(initialData.deliveryType || "standard");
      setDeliveryFee(initialData.deliveryFee ?? null);
    }
  }, [initialData]);

  useEffect(() => {
    const shouldFetch =
      fullName && phone && email && address && state && deliveryType;

    if (shouldFetch) {
      const fetchFee = async () => {
        try {
          setLoadingFee(true);
          const res = await axios.post("/api/delivery/rates", {
            state,
            deliveryType,
          });
          setDeliveryFee(res.data.fee);
        } catch (err) {
          console.error("Failed to fetch delivery fee:", err);
          setDeliveryFee(null);
        } finally {
          setLoadingFee(false);
        }
      };

      fetchFee();
    }
  }, [state, deliveryType, fullName, phone, email, address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill all required fields");
      return;
    }

    onNext({
      shipping: {
        fullName,
        phone,
        email,
        address,
        state,
        city,
      },
      deliveryType,
      deliveryFee,
      paymentMethod: "paystack",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm space-y-4 md:ml-16"
    >
      <h2 className="text-lg font-semibold">Shipping Information</h2>

      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="tel"
          className="w-full border p-2 rounded-md"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email Address</label>
        <input
          type="email"
          className="w-full border p-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Address</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">State</label>
        <StateSelect value={state} onChange={setState} />
      </div>

      <div>
        <label className="block text-sm font-medium">City</label>
        {isPickupSelected && isPickupAvailable ? (
          <select
            className="w-full border p-2 rounded-md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option value="">Select Pickup Location</option>
            <option value="Owerri">Chitech Office – Owerri</option>
            <option value="Orlu">Chitech Office – Orlu</option>
          </select>
        ) : (
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Delivery Type</label>
        <select
          className="w-full border p-2 rounded-md"
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
        >
          <option value="standard">Standard Delivery</option>
          <option value="express">Express Delivery</option>
          {isPickupAvailable && <option value="pickup">Pickup Location</option>}
        </select>
      </div>

      {loadingFee ? (
        <p className="text-sm text-gray-500">Loading delivery fee...</p>
      ) : deliveryFee !== null ? (
        <p className="text-sm text-green-600 font-medium">
          Delivery Fee: {formatNaira(deliveryFee)}
        </p>
      ) : (
        <p className="text-sm text-red-500">Delivery fee not available</p>
      )}

      <button
        type="submit"
        disabled={!isFormValid}
        className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
      >
        Continue to Payment
      </button>
    </form>
  );
}
