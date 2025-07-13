import Image from "next/image";

export default function OrderSummaryCard({ order }: { order: any }) {
  const firstProduct = order.items?.[0]?.product;
  const firstImage = firstProduct?.images?.[0] || null;

  return (
    <div className="border rounded p-4 space-y-3 md:flex md:justify-between md:items-start">
      {/* LEFT: Order Info */}
      <div className="space-y-3 flex-1">
        <div>
          <strong>Order ID:</strong> {order._id}
        </div>
        <div>
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </div>
        <div>
          <strong>Status:</strong> {order.status}
        </div>
        <div>
          <strong>Payment:</strong> {order.paymentMethod}
        </div>
        <div>
          <strong>Total:</strong> ₦{order.totalPrice?.toLocaleString()}
        </div>

        <div>
          <strong>Shipping address:</strong>
          <p>{order.shipping.fullName}</p>
          <p>{order.shipping.phone}</p>
          <p>{order.shipping.address}</p>
          {order.shipping.city && (
            <p>
              {order.shipping.city}, {order.shipping.state}
            </p>
          )}
          {!order.shipping.city && <p>{order.shipping.state}</p>}
        </div>

        <div>
          <strong>Items:</strong>
          <ul className="list-disc list-inside">
            {order.items.map((item: any) => (
              <li key={item._id}>
                {item.product?.title} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT: Image */}
      <div className="mt-4 md:mt-0 md:ml-6">
        {firstImage ? (
          <Image
            src={firstImage}
            alt={firstProduct?.title || "Product Image"}
            width={100}
            height={100}
            className="rounded border object-cover"
          />
        ) : (
          <div className="w-[100px] h-[100px] rounded bg-gray-100 flex items-center justify-center text-gray-400 text-xs border">
            No Image
          </div>
        )}
      </div>
    </div>
  );
}
