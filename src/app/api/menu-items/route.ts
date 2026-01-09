import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Item from "@models/Item";

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URI!);
}

/* ---------------- GET ALL ITEMS ---------------- */
export async function GET() {
  await connectDB();

  const items = await Item.find()
    .sort({ createdAt: -1 }); // 🔥 latest first

  return NextResponse.json(items);
}


/* ---------------- CREATE ITEM ---------------- */
export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  const item = await Item.create(data);
  return NextResponse.json(item, { status: 201 });
}

/* ---------------- UPDATE ITEM ---------------- */
export async function PUT(req: Request) {
  await connectDB();
  const { id, ...data } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: "Item ID missing" },
      { status: 400 }
    );
  }

  const updated = await Item.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  return NextResponse.json(updated);
}

/* ---------------- DELETE ITEM ---------------- */
export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: "Item ID missing" },
      { status: 400 }
    );
  }

  await Item.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
