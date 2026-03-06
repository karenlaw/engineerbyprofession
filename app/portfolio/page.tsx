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
  name: string;
  clone_url: string;
  created_at: string;
  description: string;
}

function getRepo(items: Repo[], maxRepos: number): Repo[] {
  const repos: Repo[] = [];

  for (let i = 0; i < Math.min(items.length, maxRepos); i++) {
    const item = items[i];
    const name = item.name || "No title";
    const clone_url = item.clone_url || "Unknown";
    const created_at = item.created_at || "";
    const description = item.description || "";

    repos.push({ name, clone_url, created_at, description });
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
  const [projects, setProjects] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
	fetchRepos()
	  .then(setProjects)
	  .catch(() => setError("Unable to load GitHub projects."))
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

        {!loading && !error && projects.map((project, index) => {
          return ( 
            <article className="repo" key={index}>
              <div className="repo-content">
                <h3 className="repo-title">
                  <a className="repo-name" href={project.clone_url} target="_blank" rel="noopener noreferrer">
                    {project.name}
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
