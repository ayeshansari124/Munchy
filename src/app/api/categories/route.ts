import mongoose from "mongoose";
import Category from "@models/Category";
import jwt from "jsonwebtoken";

async function isAdmin(req: Request) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return false;

  const token = cookie
    .split("; ")
    .find(c => c.startsWith("token="))
    ?.split("=")[1];

  if (!token) return false;

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded.role === "admin";
}

/* GET ALL CATEGORIES */
export async function GET() {
  await mongoose.connect(process.env.MONGO_URI!);
  const categories = await Category.find().sort({ createdAt: -1 });
  return Response.json(categories);
}

/* CREATE CATEGORY */
export async function POST(req: Request) {
  if (!(await isAdmin(req))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { name } = await req.json();

  await mongoose.connect(process.env.MONGO_URI!);
  const category = await Category.create({ name });

  return Response.json(category);
}

/* UPDATE CATEGORY */
export async function PUT(req: Request) {
  if (!(await isAdmin(req))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, name } = await req.json();

  await mongoose.connect(process.env.MONGO_URI!);
  const updated = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );

  return Response.json(updated);
}

/* DELETE CATEGORY */
export async function DELETE(req: Request) {
  if (!(await isAdmin(req))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await req.json();

  await mongoose.connect(process.env.MONGO_URI!);
  await Category.findByIdAndDelete(id);

  return Response.json({ success: true });
}
