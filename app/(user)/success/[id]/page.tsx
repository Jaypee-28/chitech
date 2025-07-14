// ✅ FIXED version: app/(user)/success/[id]/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import { redirect } from "next/navigation";
import SuccessPageClient from "./SuccessPageClient";

export default async function OrderSuccessPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectToDB();

  const order = await Order.findById(params.id).populate("items.product");
  if (!order || order.user.toString() !== session.user.id) {
    redirect("/dashboard/orders");
  }

  return (
    <SuccessPageClient
      order={JSON.parse(JSON.stringify(order))}
      userName={session.user.name}
    />
  );
}
