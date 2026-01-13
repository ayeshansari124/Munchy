import Order from "@/models/Order";
import { connectDB } from "@/lib/db";
import { ok, fail } from "@/lib/response";
import { requireUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = await req.json();

    await connectDB();
    await Order.create({
      ...body,
      user: user._id,
      paymentStatus: "paid",
    });

    return ok({ message: "Order placed" });
  } catch {
    return fail("Unauthorized", 401);
  }
}
