import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import crypto from "crypto";
import { sendPaymentConfirmation } from "@/lib/email";

// Disable Next.js default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const secret = process.env.PAYSTACK_SECRET_KEY!;
    const hash = crypto
      .createHmac("sha512", secret)
      .update(rawBody)
      .digest("hex");

    const signature = req.headers.get("x-paystack-signature");
    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // ✅ Only listen for successful charges
    if (event.event === "charge.success") {
      const { reference, metadata, customer } = event.data;

      await connectToDB();

      const orderId = metadata?.orderId;
      const order = await Order.findById(orderId);

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      order.status = "paid";
      order.isPaid = true;
      order.paidAt = new Date();
      order.transactionId = reference;

      await order.save();

      // ✅ Notify user
      await sendPaymentConfirmation(order.shipping.email, order._id.toString());

      return NextResponse.json({ received: true }, { status: 200 });
    }

    return NextResponse.json({ ignored: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
