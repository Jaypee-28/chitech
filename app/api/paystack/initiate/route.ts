import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Order from "@/models/Order";

export async function POST(req: NextRequest) {
  const { orderId, email } = await req.json();

  if (!orderId || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const amount = order.totalPrice * 100; // Paystack requires amount in kobo

    const secretKey = process.env.PAYSTACK_SECRET_KEY!;
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount,
          reference: orderId,
          callback_url: `https://fa73caba4b28.ngrok-free.app/payment/callback`,
        }),
      }
    );

    const result = await response.json();

    if (!result.status) {
      return NextResponse.json(
        { error: "Paystack init failed", details: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { authorization_url: result.data.authorization_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Paystack Init Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
