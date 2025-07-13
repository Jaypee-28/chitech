import { connectToDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import AdminOrderTable from "@/components/admin/order/AdminOrderCard";

export default async function AdminOrdersPage() {
  await connectToDB();

  const orders = await Order.find({}).populate("user").sort({ createdAt: -1 });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📦 All Orders</h1>
      <AdminOrderTable orders={JSON.parse(JSON.stringify(orders))} />
    </div>
  );
}
