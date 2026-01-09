import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "@models/User";

export async function PUT(req: Request) {
  try {
    const { name, phone, address, role } = await req.json();

    const cookie = req.headers.get("cookie");
    if (!cookie) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const token = cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    await mongoose.connect(process.env.MONGO_URI!);

    const updatedUser = await User.findByIdAndUpdate(
  decoded.id,
  {
    $set: {
      name,
      phone,
      address,
      role,
    },
  },
  {
    new: true,
    runValidators: true,
  }
).select("name email phone address role");

    return new Response(JSON.stringify(updatedUser), { status: 200 });

  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}
