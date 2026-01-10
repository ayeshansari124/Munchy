import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📦 ORDER BODY:", body);

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

    await mongoose.connect(process.env.MONGO_URI!);

    const order = await Order.create({
      user: decoded.id,
      items: body.items,
      address: body.address,
      total: body.total,
      paymentId: body.paymentId,
    });

    console.log("✅ ORDER SAVED:", order._id);

    return Response.json(order);
  } catch (err) {
    console.error("❌ ORDER SAVE FAILED:", err);
    return new Response("Failed", { status: 500 });
  }
}
