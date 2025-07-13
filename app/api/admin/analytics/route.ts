import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import Order from "@/models/Order";
import Product from "@/models/Product"; // ✅ Added Product model

export async function GET(req: Request) {
  try {
    await connectToDB();

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get total users
    const totalUsers = await User.countDocuments();

    // Get total products
    const totalProducts = await Product.countDocuments();

    // Get all orders
    const orders = await Order.find();

    const totalOrders = orders.length;

    const totalRevenue = orders
      .filter((order) => order.isPaid === true)
      .reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    // Order status overview
    const orderStatusOverview = {
      pending: orders.filter((order) => order.status === "pending").length,
      paid: orders.filter((order) => order.status === "paid").length,
      delivered: orders.filter((order) => order.status === "delivered").length,
      cancelled: orders.filter((order) => order.status === "cancelled").length,
    };

    // Monthly revenue breakdown (as an array)
    const monthlyMap: { [key: string]: number } = {};

    orders
      .filter((order) => order.isPaid === true)
      .forEach((order) => {
        const month = new Date(order.createdAt).toLocaleString("default", {
          month: "short",
        });
        monthlyMap[month] = (monthlyMap[month] || 0) + (order.totalPrice || 0);
      });

    const monthlyRevenue = Object.entries(monthlyMap).map(
      ([month, revenue]) => ({
        month,
        revenue,
      })
    );

    return NextResponse.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      totalProducts,
      orderStatusOverview,
      monthlyRevenue,
    });
  } catch (error) {
    console.error("Failed to load admin analytics:", error);
    return NextResponse.json(
      { message: "Failed to load analytics" },
      { status: 500 }
    );
  }
}
