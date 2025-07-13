// app/api/admin/categories/route.ts
import { connectToDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// 🔐 Admin check helper
// async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== "admin") {
//     return false;
//   }
//   return true;
// }

// 📥 Create category
export async function POST(req: Request) {
  // if (!(await isAdmin())) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  try {
    await connectToDB();
    const { name } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const exists = await Category.findOne({ name });
    if (exists) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 409 }
      );
    }

    const category = await Category.create({ name });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 📤 Get all categories
export async function GET() {
  // if (!(await isAdmin())) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  try {
    await connectToDB();
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
