import db from "@/lib/db";

export async function GET() {
  try {
    await db.query(`
      ALTER TABLE schools 
      MODIFY id INT NOT NULL AUTO_INCREMENT 
    `);

    return Response.json({ message: "✅ Table fixed: id is now AUTO_INCREMENT" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
