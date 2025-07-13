import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import { Review } from "@/models/Reviews";

export async function GET() {
  await connectToDB();
  const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  await connectToDB();
  const body = await req.json();
  const { name, message, rating } = body;

  if (!name || !message || !rating) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const newReview = await Review.create({ name, message, rating });
  return NextResponse.json(newReview);
}
