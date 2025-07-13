// app/api/admin/categories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/Category";
import { connectToDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// UPDATE
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDB();
    const { name } = await req.json();
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const updated = await Category.findByIdAndUpdate(
      params.id,
      { name, slug },
      { new: true }
    );
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDB();
    const deleted = await Category.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Category deleted" });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 }
    );
  }
}
