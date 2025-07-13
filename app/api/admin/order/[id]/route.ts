// /app/api/admin/order/[id]/route.ts
import { connectToDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const { status, trackingId, isPaid } = await req.json();

  try {
    const order = await Order.findById(id);
    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    if (status) order.status = status;
    if (trackingId) order.trackingId = trackingId;
    if (typeof isPaid === "boolean") {
      order.isPaid = isPaid;
      order.paidAt = isPaid ? new Date() : null;
    }

    await order.save();
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { message: "Failed to update order", error },
      { status: 500 }
    );
  }
}
