export const runtime = "nodejs";

import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "menu-items" },
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      ).end(buffer);
    });

    return Response.json({ url: result.secure_url });

  } catch (err) {
    console.error("UPLOAD FAILED:", err);
    return new Response("Upload failed", { status: 500 });
  }
}
