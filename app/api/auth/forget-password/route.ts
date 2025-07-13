import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  console.log("Forgot password route hit!!");
  await connectToDB();
  const body = await req.json();
  console.log("Forgot password request body:", body);

  const email = body;

  if (!email) {
    console.log("No email provided");
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "If that email exists, a reset link has been sent." },
      { status: 200 }
    ); // don't expose real emails
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 minutes

  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpires = resetTokenExpiry;
  await user.save();

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&email=${email}`;

  await sendPasswordResetEmail(email, resetUrl);

  return NextResponse.json({ message: "Reset email sent" }, { status: 200 });
}
