import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "@models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    // 1. Read request body
    const { email, password } = await req.json();

    // 2. Basic validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required" }),
        { status: 400 }
      );
    }

    // 3. Connect to database
    await mongoose.connect(process.env.MONGO_URI!);

    // 4. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // 5. Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // 6. Safe response (never send password)
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

   

const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
    role: user.role, // 👈 REQUIRED
  },
  process.env.JWT_SECRET!,
  { expiresIn: "7d" }
);


return new Response(
  JSON.stringify({ message: "Login successful" }),
  {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`,
    },
  }
);


  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return new Response(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
}
