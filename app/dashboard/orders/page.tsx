// app/(user)/dashboard/orders/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import OrderCard from "@/components/user/order/OrderCard";
import { connectToDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import mongoose from "mongoose";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  await connectToDB();

  let orders = [];

  try {
    const userId = new mongoose.Types.ObjectId(session.user.id);
    orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("items.product");
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    // If anything fails (invalid ID, DB down, etc), return empty
    orders = [];
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-6">🛒 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <OrderCard key={order._id.toString()} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
