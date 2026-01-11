import { connectDB } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const user = await requireUser();
  const { name, phone, address } = await req.json();

  await connectDB();

  const updated = await User.findByIdAndUpdate(
    user._id,
    { name, phone, address },
    { new: true, runValidators: true }
  ).select("name email phone address role");

  return NextResponse.json(updated);
}
