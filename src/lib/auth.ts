import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "./db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getUser() {
  await connectDB();

  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return await User.findById(decoded.id).select("-password");
  } catch {
    return null;
  }
}
export async function requireUser() {
  const user = await getUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") throw new Error("FORBIDDEN");
  return user;
}
