import { NextResponse } from "next/server";

const rssUrl = "https://medium.com/feed/@engineerbyprofession";

export async function GET() {
  const methods = [
    // Method 1: Direct fetch (works if Medium allows server requests)
    async () => {
      const res = await fetch(rssUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; NextJS RSS fetcher)" },
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error(`Medium direct fetch returned ${res.status}`);
      const xml = await res.text();
      return { type: "xml", data: xml };
    },
    // Method 2: AllOrigins
    async () => {
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`);
      if (!res.ok) throw new Error("AllOrigins failed");
      const data = await res.json();
      if (!data.contents) throw new Error("AllOrigins: no content");
      return { type: "xml", data: data.contents };
    },
    // Method 3: RSS2JSON (returns pre-parsed JSON)
    async () => {
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
      if (!res.ok) throw new Error("RSS2JSON failed");
      const data = await res.json();
      if (data.status !== "ok") throw new Error("RSS2JSON error");
      return { type: "json", data: JSON.stringify(data) };
    },
    // Method 4: corsproxy
    async () => {
      const res = await fetch(`https://corsproxy.org/?${encodeURIComponent(rssUrl)}`);
      if (!res.ok) throw new Error("corsproxy failed");
      const xml = await res.text();
      return { type: "xml", data: xml };
    },
    // Method 5: codetabs
    async () => {
      const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`);
      if (!res.ok) throw new Error("codetabs failed");
      const xml = await res.text();
      return { type: "xml", data: xml };
    },
  ];

  for (let i = 0; i < methods.length; i++) {
    try {
      const result = await methods[i]();
      if (result.type === "json") {
        return NextResponse.json(JSON.parse(result.data));
      } else {
        return new NextResponse(result.data, {
          headers: { "Content-Type": "application/xml" },
        });
      }
    } catch (e) {
      console.error(`Method ${i + 1} failed:`, e);
      if (i === methods.length - 1) {
        return NextResponse.json({ error: "All methods failed" }, { status: 500 });
      }
    }
  }
}
