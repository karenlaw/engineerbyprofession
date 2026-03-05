import { NextResponse } from "next/server";

const rssUrl = "https://medium.com/feed/@engineerbyprofession";

export async function GET() {
  try {
    // Server-side fetch goes directly to Medium - no CORS proxies needed
    const res = await fetch(rssUrl, {
      headers: {
        // Mimic a browser to avoid Medium blocking the request
        "User-Agent": "Mozilla/5.0 (compatible; NextJS RSS fetcher)",
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) throw new Error(`Medium returned ${res.status}`);

    const xml = await res.text();
    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml" },
    });

  } catch (err) {
    console.error("Failed to fetch Medium RSS:", err);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
