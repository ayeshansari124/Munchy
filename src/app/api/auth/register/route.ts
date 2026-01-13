import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { ok, fail } from "@/lib/response";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) return fail("All fields required");

  await connectDB();

  const exists = await User.findOne({ email });
  if (exists) return fail("Email already exists");

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashed,
    role: "user",
  });

  return ok({ message: "Account created" });
}
