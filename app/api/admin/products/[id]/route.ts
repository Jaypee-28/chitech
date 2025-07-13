// app/api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const product = await Product.findById(params.id);
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);
    const rating = parseFloat(formData.get("rating") as string);
    const category = formData.get("category") as string;
    const brand = formData.get("brand") as string | null;

    const existingImages = formData.getAll("existingImages") as string[];
    const newImageFiles = formData.getAll("images") as File[];

    const uploadedImageUrls: string[] = [];

    // Upload new images to Cloudinary
    for (const file of newImageFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = `data:${file.type};base64,${buffer.toString(
        "base64"
      )}`;
      const imageUrl = await uploadImageToCloudinary(base64Image);
      uploadedImageUrls.push(imageUrl);
    }

    // Merge existing and new image URLs
    const allImages = [...existingImages, ...uploadedImageUrls];

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        price,
        stock,
        rating,
        category,
        brand: brand || undefined,
        images: allImages,
      },
      { new: true }
    );

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;

  await connectToDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(params.id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
