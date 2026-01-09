import mongoose from "mongoose";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    // 1. Parse body
    const { name, email, password } = await req.json();

    // 2. Basic validation (do NOT trust frontend)
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // 3. Connect to DB (AWAIT IT)
    await mongoose.connect(process.env.MONGO_URI!);

    // 4. Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "Email already registered" }),
        { status: 409 }
      );
    }

    // 5. Create user (password hashing happens in model)
    const user = await User.create({ name, email, password });

    // 6. Never return password
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

   const token = jwt.sign(
  { id: user._id, email: user.email },
  process.env.JWT_SECRET!,
  { expiresIn: "7d" }
);

return new Response(
  JSON.stringify({ message: "Registered successfully" }),
  {
    status: 201,
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`,
    },
  }
);

  } catch (error: any) {
    console.error("REGISTER ERROR:", error);

    return new Response(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
}
