import { connectDB } from "@/lib/db";
import Item from "@/models/Item";
import { ok, fail } from "@/lib/response";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const items = await Item.find();
  return ok(items);
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    await connectDB();
    await Item.create(body);
    return ok({ message: "Item created" });
  } catch {
    return fail("Unauthorized", 401);
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
    const { id, ...data } = await req.json();
    await Item.findByIdAndUpdate(id, data);
    return ok({ message: "Item updated" });
  } catch {
    return fail("Unauthorized", 401);
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdmin();
    const { id } = await req.json();
    await Item.findByIdAndDelete(id);
    return ok({ message: "Item deleted" });
  } catch {
    return fail("Unauthorized", 401);
  }
}
