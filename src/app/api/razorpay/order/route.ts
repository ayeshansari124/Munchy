import Razorpay from "razorpay";
import { ok, fail } from "@/lib/response";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return fail("Valid amount required");
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return ok(order);
  } catch (err) {
    console.error("RAZORPAY ERROR:", err);
    return fail("Failed to create Razorpay order", 500);
  }
}
