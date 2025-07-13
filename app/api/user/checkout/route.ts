// /app/api/user/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectToDB } from "@/lib/mongoose";
import Order from "@/models/Order";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // ✅ Redirect if user is not logged in
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", "/checkout");
    return NextResponse.redirect(loginUrl);
  }

  try {
    await connectToDB();

    const body = await req.json();

    const {
      items, // ✅ must match model: items[]
      shipping, // ✅ must match model: shipping object
      total, // ✅ must match model: total
      paymentMethod,
    } = body;

    // ✅ Check for missing fields
    if (
      !items?.length ||
      !shipping?.fullName ||
      !shipping?.address ||
      !shipping?.city ||
      !shipping?.state ||
      !shipping?.phone ||
      !total ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { message: "Missing required order data" },
        { status: 400 }
      );
    }

    const newOrder = new Order({
      user: session.user.id,
      items,
      shipping,
      total,
      paymentMethod,
      status: "pending",
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Order placed successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { message: "Something went wrong during checkout" },
      { status: 500 }
    );
  }
}
