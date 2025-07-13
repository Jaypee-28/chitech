import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDB } from "@/lib/mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "4");
    const products = await Product.find().sort({ createdAt: -1 }).limit(limit);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch latest products:", error);
    return NextResponse.json(
      { message: "Failed to fetch latest products" },
      { status: 500 }
    );
  }
}
