import jwt from "jsonwebtoken";
import User from "@models/User";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie");
    if (!cookie) {
      return new Response(JSON.stringify(null), { status: 200 });
    }

    const token = cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return new Response(JSON.stringify(null), { status: 200 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    await mongoose.connect(process.env.MONGO_URI!);
    const user = await User.findById(decoded.id).select("name email phone address role");

    return new Response(JSON.stringify(user), { status: 200 });

  } catch {
    return new Response(JSON.stringify(null), { status: 200 });
  }
}
