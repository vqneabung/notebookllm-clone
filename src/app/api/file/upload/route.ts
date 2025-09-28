import path from "path";
import { promises as fs } from "fs";

export async function POST(req: Request) {
  const formData = await req.formData();

  const files = formData.getAll("files") as File[];
  if (files.length === 0) {
    return new Response("No files uploaded", { status: 400 });
  }

  // lấy buffer từ file
  const buffers = await Promise.all(files.map(async (file) => Buffer.from(await file.arrayBuffer())));

  // file name (loại bỏ dấu cách, v.v)
  const safeName = files.map((file) => file.name.replace(/\s+/g, "_")).join("-");
  // thư mục upload
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  // đảm bảo thư mục tồn tại
  await fs.mkdir(uploadDir, { recursive: true });

  const dest = path.join(uploadDir, safeName);

  try {
    for (const [i, buffer] of buffers.entries()) {
        await fs.writeFile(dest, buffer);
    }
    return Response.json(
      { message: "Uploaded", filename: safeName },
      { status: 201 }
    );
  } catch (e) {
    console.error("Write error", e);
    return Response.json(
      { message: "Failed", error: String(e) },
      { status: 500 }
    );
  }
}
