// app/api/user/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectToDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";
import mongoose from "mongoose";
import { sendOrderConfirmation, sendNewOrderNotification } from "@/lib/email";

// ✅ Fetch user orders
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await connectToDB();
    const userId = new mongoose.Types.ObjectId(session.user.id);
    console.log("👤 Fetching orders for user ID:", userId);

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${orders.length} orders for user`);
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("❌ Fetch user orders error:", error);
    return NextResponse.json(
      { message: "Failed to fetch order history" },
      { status: 500 }
    );
  }
}

// ✅ Create order + send emails
export async function POST(req: Request) {
  await connectToDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const { items, deliveryType, deliveryFee, shipping, paymentMethod } = body;

    if (
      !items?.length ||
      !deliveryType ||
      deliveryFee === undefined ||
      !shipping?.fullName ||
      !shipping?.phone ||
      !shipping?.address ||
      !shipping?.state ||
      !shipping?.email ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (deliveryType !== "pickup" && !shipping?.city) {
      return NextResponse.json(
        { error: "City is required for non-pickup deliveries" },
        { status: 400 }
      );
    }

    // ✅ Recalculate total from DB
    const populatedItems = await Promise.all(
      items.map(async (item: any) => {
        const product = await Order.db
          .collection("products")
          .findOne({ _id: new mongoose.Types.ObjectId(item.product) });
        if (!product) throw new Error(`Product not found: ${item.product}`);
        return {
          product: item.product,
          quantity: item.quantity,
          price: product.price,
          subtotal: product.price * item.quantity,
        };
      })
    );

    const itemsTotal = populatedItems.reduce((sum, i) => sum + i.subtotal, 0);
    const totalPrice = itemsTotal + deliveryFee;

    // ✅ Calculate ETA
    const now = new Date();
    let deliveryEta: string | undefined;

    if (deliveryType === "standard") {
      const etaStart = new Date(now);
      etaStart.setDate(etaStart.getDate() + 6);
      const etaEnd = new Date(now);
      etaEnd.setDate(etaEnd.getDate() + 7);
      deliveryEta = `${etaStart.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })} - ${etaEnd.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })}`;
    } else if (deliveryType === "express") {
      const etaStart = new Date(now);
      etaStart.setDate(etaStart.getDate() + 2);
      const etaEnd = new Date(now);
      etaEnd.setDate(etaEnd.getDate() + 3);
      deliveryEta = `${etaStart.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })} - ${etaEnd.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })}`;
    }

    const orderData = {
      user: user._id, // ✅ Use the correct user ID from DB
      items,
      totalPrice,
      deliveryType,
      deliveryFee,
      deliveryEta,
      shipping,
      paymentMethod: paymentMethod.toLowerCase(),
    };

    const order = await Order.create(orderData);
    const populatedOrder = await Order.findById(order._id).populate(
      "items.product"
    );

    await sendOrderConfirmation(shipping.email, populatedOrder);
    await sendNewOrderNotification({
      adminEmail: process.env.ADMIN_EMAIL!,
      orderId: order._id.toString(),
      user: {
        name: session.user.name,
        email: session.user.email,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err: any) {
    console.error("❌ Order creation error:", err);
    return NextResponse.json(
      { error: "Order creation failed", details: err.message },
      { status: 500 }
    );
  }
}
