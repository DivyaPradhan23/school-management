import db from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const file = formData.get("file");

    // Save image in public/
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = Date.now() + "-" + file.name;

    const uploadDir = path.join(process.cwd(), "public", "schoolImages");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    // ✅ Save relative path instead of filename only
    const imagePath = `${filename}`;

    // Save data to DB
    const [result] = await db.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imagePath, email_id]
    );

    return new Response(
      JSON.stringify({
        id: result.insertId,
        name,
        address,
        city,
        state,
        contact,
        email_id,
        image: imagePath,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/schools:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM schools ORDER BY id DESC");
    const [countResult] = await db.query("SELECT COUNT(*) AS total FROM schools");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://school-management-production-f2e7.up.railway.app";

    const schools = rows.map((school) => ({
      ...school,
      image: school.image // ✅ correct
    }));


    return Response.json({
      schools,
      total: countResult[0].total,
    });
  } catch (error) {
    console.error("Error in GET /api/schools:", error);
    return new Response(JSON.stringify({ error: error.stack }), { status: 500 });
  }
}

