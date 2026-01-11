export const runtime = "nodejs";

import cloudinary from "@/lib/cloudinary";
import { ok, fail } from "@/lib/response";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return fail("No file provided");

    const buffer = Buffer.from(await file.arrayBuffer());

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "menu-items" },
        (err, res) => (err ? reject(err) : resolve(res))
      ).end(buffer);
    });

    return ok({ url: result.secure_url });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return fail("Upload failed", 500);
  }
}
