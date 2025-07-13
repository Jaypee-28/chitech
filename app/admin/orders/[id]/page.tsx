import Order from "@/models/Order";
import AdminOrderDetail from "@/components/admin/order/AdminOrderDetail";

interface Params {
  params: {
    id: string;
  };
}

export default async function AdminOrderPage({ params }: Params) {
  const order = await Order.findById(params.id)
    .populate("user")
    .populate("items.product");

  if (!order) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-red-600">Order not found.</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <AdminOrderDetail order={JSON.parse(JSON.stringify(order))} />
    </div>
  );
}
