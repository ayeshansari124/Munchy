import mongoose from "mongoose";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie");
    if (!cookie) {
      return new Response("Unauthorized", { status: 401 });
    }

    const token = cookie
      .split("; ")
      .find(c => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    // ✅ ADMIN CHECK (CRITICAL)
    if (decoded.role !== "admin") {
      return new Response("Forbidden", { status: 403 });
    }

    await mongoose.connect(process.env.MONGO_URI!);

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return Response.json(orders);
  } catch (err) {
    console.error("ADMIN ORDERS ERROR:", err);
    return new Response("Server error", { status: 500 });
  }
}
