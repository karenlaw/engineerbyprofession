// inspired by https://medium.com/@MurphyFreelance/how-to-display-your-medium-article-feed-on-your-website-with-images-368fffd574f9
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import bannerImage from '../../public/The Encyclopedie recueil des planches.jpg';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

function parseRSSFromXML(xmlContent: string, maxArticles: number): Article[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
  const items = xmlDoc.querySelectorAll("item");
  const articles: Article[] = [];

  for (let i = 0; i < Math.min(items.length, maxArticles); i++) {
    const item = items[i];
    const title = item.querySelector("title")?.textContent?.trim() || "No title";

    let link = "#";
    const linkEl = item.querySelector("link");
    if (linkEl) {
      link = linkEl.textContent?.trim() ||
        linkEl.nextSibling?.textContent?.trim() || "#";
    }

    const pubDate = item.querySelector("pubDate")?.textContent?.trim() || "";
    const description = item.querySelector("description")?.textContent || "";

    // Use getElementsByTagNameNS to avoid the invalid "content:encoded" selector
    const contentEncoded = item.getElementsByTagNameNS(
      "http://purl.org/rss/1.0/modules/content/", "encoded"
    )[0]?.textContent || "";

    const summary = item.querySelector("summary")?.textContent || "";

    let content = "";
    [description, contentEncoded, summary].forEach((field) => {
      if (field && field.length > content.length) content = field;
    });

    articles.push({ title, link, pubDate, description: content });
  }

  return articles;
}

function stripHtml(html: string): string {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function truncateText(text: string, maxLength = 200): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).substr(0, text.lastIndexOf(" ")) + "...";
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function fetchMediumArticles(maxArticles = 5): Promise<Article[]> {
  const res = await fetch("/api/articles");
  if (!res.ok) throw new Error("Failed to fetch articles");

  const contentType = res.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    const data = await res.json();
    return data.items.slice(0, maxArticles) as Article[];
  }

  const xml = await res.text();
  return parseRSSFromXML(xml, maxArticles);
}

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMediumArticles()
      .then(setArticles)
      .catch(() => setError("Unable to load articles. Please check your Medium username."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="blog-container">
        <div className="articles-header">
          <h2>Medium Publication Articles</h2>
        </div>
        <div className="container">
          <Image
            src={bannerImage}
            alt="printing book in quarto format layout illustration"
          />
        </div>
        <p>Some posts from my Medium publication collection</p>

        {loading && (
          <div className="loading">
            <div className="spinner" />
            Loading...
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {!loading && !error && articles.map((article, index) => {
          const cleanDescription = stripHtml(article.description || "");
          const truncated = truncateText(cleanDescription);

          return (
            <article className="article" key={index}>
              <div className="article-content">
                <h3 className="article-title">
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h3>
                {truncated && truncated.length > 10 && (
                  <p className="article-description">{truncated}</p>
                )}
                <div className="article-meta">
                  <span className="article-date">{formatDate(article.pubDate)}</span>
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="read-more">
                    Read More
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
  );
}
