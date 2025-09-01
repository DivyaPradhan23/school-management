// app/api/schools/route.js
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

    if (!name || !address || !city || !state || !contact || !email_id || !file) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
      });
    }

    // Save image inside /public/schoolImages
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = Date.now() + "-" + file.name;

    const uploadDir = path.join(process.cwd(), "public", "schoolImages");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    // Save data to DB
    const [result] = await db.query(
      `INSERT INTO schools 
       (name, address, city, state, contact, image, email_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, filename, email_id]
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
        image: `/schoolImages/${filename}`, // return public path
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
    // fetch all schools
    const [rows] = await db.query("SELECT * FROM schools ORDER BY id DESC");

    // fetch total count
    const [countResult] = await db.query("SELECT COUNT(*) AS total FROM schools");

    // attach image public path for each school
    const schools = rows.map((school) => ({
      ...school,
      image: school.image ? `/schoolImages/${school.image}` : null,
    }));

    return Response.json({
      schools,
      total: countResult[0].total,
    });
  } catch (error) {
    console.error("Error in GET /api/schools:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
