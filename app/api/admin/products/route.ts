// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function POST(req: NextRequest) {
  await connectToDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    if (
      req.headers.get("content-type")?.startsWith("multipart/form-data") ===
      false
    ) {
      return NextResponse.json(
        { message: "Invalid content type" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const files = formData.getAll("images") as File[];
    const uploadedImageUrls: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
      const imageUrl = await uploadImageToCloudinary(base64);
      uploadedImageUrls.push(imageUrl);
    }

    const product = await Product.create({
      title: formData.get("title"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string),
      rating: parseFloat(formData.get("rating") as string) || 0,
      brand: formData.get("brand") || undefined,
      category: formData.get("category"),
      images: uploadedImageUrls,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const products = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse("Failed to fetch products", { status: 500 });
  }
}
