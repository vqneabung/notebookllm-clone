import path from "path";
import { promises as fs } from "fs";
import { PdfBufferToText } from "../../../../../lib/actions/pdfToText";
import { createResource } from "../../../../../lib/actions/resources";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files") as File[];
    if (files.length === 0) {
      return new Response("No files uploaded", { status: 400 });
    }

    // lấy buffer từ file
    const buffers = await Promise.all(
      files.map(async (file) => Buffer.from(await file.arrayBuffer()))
    );

    const safeName = files
      .map((file) => file.name.replace(/\s+/g, "_"))
      .join("-");
    // // thư mục upload
    // const uploadDir = path.join(process.cwd(), "public", "uploads");
    // // đảm bảo thư mục tồn tại
    // await fs.mkdir(uploadDir, { recursive: true });

    // const dest = path.join(uploadDir, safeName);

    // try {
    //   for (const [i, buffer] of buffers.entries()) {
    //     console.log("Writing file to", dest);
    //     await fs.writeFile(dest, buffer);
    //     console.log("File written:", dest);
    //   }

    //   //CHeck xem file da duoc luu chua
    //   const savedFiles = await fs.readdir(uploadDir);
    //   console.log("Saved files in upload dir:", savedFiles);
    //   if (!savedFiles.includes(safeName)) {
    //     throw new Error("File not found after write");
    //   }

    //   //Doc lai file tu thu muc
    //   const readBuffers = await Promise.all(
    //     files.map(async (file) => {
    //       const filePath = path.join(uploadDir, file.name);
    //       return fs.readFile(filePath);
    //     })
    //   );

    // Chuyen sang dang text
    const pdfTexts = await Promise.all(
      buffers.map((buffer) => PdfBufferToText(buffer))
    );

    // luu vao embedding va db
    for (const [i, text] of pdfTexts.entries()) {
      var result = await createResource({ content: text });
      console.log("Result:", result);
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
