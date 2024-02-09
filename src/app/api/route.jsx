import { pool } from "../../../config/db";

export async function GET(req, res) {
  try {

    const [response] = await pool.query(`SELECT NOW()`)

    return Response.json(response[0]['NOW()'], { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error: Something went wrong", { status: 500 });
  }
}
