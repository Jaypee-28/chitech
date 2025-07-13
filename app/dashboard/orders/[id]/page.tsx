import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import { redirect, notFound } from "next/navigation";
import OrderSummaryCard from "@/components/user/order/OrderSummaryCard";

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectToDB();

  const order = await Order.findOne({
    _id: params.id,
    user: session.user.id,
  }).populate("items.product");

  if (!order) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🧾 Order Details</h1>
      <OrderSummaryCard order={order} />
    </div>
  );
}
