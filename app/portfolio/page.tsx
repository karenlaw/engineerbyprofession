"use client";

import Image from "next/image";
import React, { createContext, useState, useEffect } from "react";
//import Link from "next/link";
import cardImage from '../../public/old_catalog_card.png';
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GIT_TOKEN,
});

interface Repo {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

function getRepo(items: string, maxRepos: number): Repo[] {
  const repos: Repo[] = [];

  for (let i = 0; i < Math.min(items.length, maxRepos); i++) {
    const item = items[i];
    const title = item.name || "No title";
    const link = item.clone_url || "Unknown";
    const pubDate = item.created_at || "";
    const description = item.description || "";

    repos.push({ title, link, pubDate, description });
  }

  return repos;
}

async function fetchRepos(maxRepos = 5): Promise<Repo[]> {

  const method = 
    async () => {
	  const res = await octokit.paginate("GET /user/repos", {
      type: "public",
    });
    console.log(res);
    return getRepo(res, maxRepos);
	};
	
  return await method();
}

export default function Portfolio() {
  const [articles, setArticles] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
	fetchRepos()
	  .then(setArticles)
	  // .catch(() => setError("Unable to load articles. Please check your Medium username."))
	  .finally(() => setLoading(false));
  }, []);

  return (
	<>
	<h2>Portfolio</h2>

  <div className="repo-container">
	  <div className="image-container">
	    <Image
	      src={cardImage}
	      alt="old fashion catalog card image"
	      width={300}
	    />
	  </div>
		<p>
        My projects on GitHub
    </p>
        {loading && (
          <div className="loading">
            <div className="spinner" />
            Loading...
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {!loading && !error && articles.map((article, index) => {
          return ( 
            <article className="repo" key={index}>
              <div className="repo-content">
                <h3 className="repo-title">
                  <a className="repo-name" href={article.link} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h3>
              </div>
            </article>
          );
        })}
		  <p />
    </div>
      </>
  );
}
