import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Product from "@/models/Product";
import Category from "@/models/Category";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectToDB();

    const product = await Product.findById(params.id).populate(
      "category",
      "name"
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching product" },
      { status: 500 }
    );
  }
}
