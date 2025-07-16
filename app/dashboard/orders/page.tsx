import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import OrderCard from "@/components/user/order/OrderCard";
import { connectToDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import mongoose from "mongoose";
import Product from "@/models/Product";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    console.error("❌ No session or session.user.id");
    redirect("/login");
  }

  await connectToDB();
  console.log("✅ Connected to DB");

  let orders = [];

  try {
    const userId = new mongoose.Types.ObjectId(session.user.id);
    console.log("👤 Fetching orders for user ID:", session.user.id);

    orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("items.product");

    console.log(`✅ Found ${orders.length} orders for user`);
  } catch (error) {
    console.error("❌ Failed to fetch orders:", error);
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
