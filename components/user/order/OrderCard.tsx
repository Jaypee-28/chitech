import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export default function OrderCard({ order }: { order: any }) {
  const orderId =
    typeof order._id === "object" && "toHexString" in order._id
      ? order._id.toHexString()
      : String(order._id || "");

  const firstProduct = order.items?.[0]?.product;
  const firstImage = firstProduct?.images?.[0] || null;
  const firstTitle = firstProduct?.title || "Order";

  return (
    <div className="rounded p-4 shadow-sm">
      <div className="flex justify-between items-start">
        {/* LEFT: Order Info */}
        <div className="flex-1 space-y-1">
          <div className="font-semibold">{firstTitle}</div>

          <div className="text-sm">
            <span className="font-medium">Items:</span> {order.items.length}
          </div>
          <div className="text-sm">
            <span className="font-medium">Total:</span> ₦
            {order.totalPrice?.toLocaleString()}
          </div>
          <div className="text-sm capitalize">
            <span className="font-medium">Payment:</span> {order.paymentMethod}
          </div>
          <div className="text-sm capitalize">
            <span className="font-medium">Status:</span> {order.status}
          </div>

          <Link
            href={`/dashboard/orders/${orderId}`}
            className="text-blue-600 text-sm hover:underline font-medium block pt-1"
          >
            See Details
          </Link>
        </div>

        {/* RIGHT: Date + Image */}
        <div className="flex flex-col items-end ml-4">
          <div className="text-sm text-gray-500 mb-2">
            {format(new Date(order.createdAt), "MMM d, yyyy")}
          </div>

          {firstImage ? (
            <Image
              src={firstImage}
              alt={firstProduct?.title || "Product Image"}
              width={80}
              height={80}
              className="rounded object-cover border"
            />
          ) : (
            <div className="w-[60px] h-[60px] rounded bg-gray-100 flex items-center justify-center text-gray-400 text-xs border">
              No Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
