import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import { ok, fail } from "@/lib/response";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 });
  return ok(categories);
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const { name } = await req.json();

    if (!name) return fail("Name required");

    await connectDB();
    await Category.create({ name });
    return ok({ message: "Category created" });
  } catch {
    return fail("Unauthorized", 401);
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
    const { id, name } = await req.json();
    await Category.findByIdAndUpdate(id, { name });
    return ok({ message: "Updated" });
  } catch {
    return fail("Unauthorized", 401);
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdmin();
    const { id } = await req.json();
    await Category.findByIdAndDelete(id);
    return ok({ message: "Deleted" });
  } catch {
    return fail("Unauthorized", 401);
  }
}
