import db from "@/lib/db";

export async function GET() {
  try {
    await db.query(`
     UPDATE schools
      SET image = REPLACE(image, 'schoolImages/', '');

    `);

    return Response.json({ message: "✅ Table fixed: id is now AUTO_INCREMENT" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
