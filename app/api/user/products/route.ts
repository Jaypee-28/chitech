import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const categoryName = searchParams.get("category"); // ✅ Name not ID
    const brands = searchParams.getAll("brands");

    const query: any = {
      isArchived: { $ne: true },
    };

    // ✅ Handle search (title, description, category name)
    if (search) {
      const matchingCategories = await Category.find({
        name: { $regex: search, $options: "i" },
      });

      const categoryIds = matchingCategories.map((cat) => cat._id);

      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $in: categoryIds } },
      ];
    }

    // ✅ Convert category name to ObjectId
    if (categoryName) {
      const categoryDoc = await Category.findOne({ name: categoryName });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      } else {
        // If category doesn't exist, return empty array early
        return NextResponse.json([]);
      }
    }

    // ✅ Brand filter
    if (brands.length > 0) {
      query.brand = { $in: brands };
    }

    // ✅ Price filter
    if (min || max) {
      query.price = {};
      if (min) query.price.$gte = parseFloat(min);
      if (max) query.price.$lte = parseFloat(max);
    }

    const products = await Product.find(query)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch user products:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
