import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
  }
  return createClient(url, key);
}

export async function GET(req: Request) {
  const supabase = getSupabase();
  const { pathname } = new URL(req.url);
  const m = pathname.match(/\/api\/chat\/sessions\/([^/]+)$/);
  const userId = m?.[1];

  if (!userId || typeof userId !== "string") {
    return NextResponse.json({ error: "Invalid or missing User ID" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("chat_sessions")
      .select("id, title, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json([]); // return empty array on error
    }

    return NextResponse.json(data || []);
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json([]); // return empty array on unexpected error
  }
}
