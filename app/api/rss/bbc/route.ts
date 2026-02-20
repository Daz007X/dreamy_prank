// app/api/rss/bbc/route.ts
import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function GET() {
  try {
    const res = await fetch("https://feeds.bbci.co.uk/news/world/rss.xml", {
      next: { revalidate: 300 }, // ISR: Cache 5 นาที ลดการเรียกซ้ำ
    });
    const xml = await res.text();
    const json = await parseStringPromise(xml);

    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch RSS" }, { status: 500 });
  }
}
