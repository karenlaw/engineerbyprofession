"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import cardImage from '../../public/old_catalog_card.png';
// import { Octokit } from "octokit";
import { formatDate } from "../components/lib";

// const octokit = new Octokit({
//   auth: process.env.GIT_TOKEN,
// });

interface Repo {
  name: string;
  url: string;
  pushed_at: string;
  description: string;
}

async function fetchRepos(maxRepos = 5): Promise<Repo[]> {
  const res = await fetch("/api/projects?maxRepos=" + maxRepos);
  console.log(res);

  if (!res.ok) throw new Error("Failed to fetch articles");

  const contentType = res.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    const data = await res.json() || "";

    return data.items as Repo[];
  }
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
      <div className="repo-container">
        <div className="repo-header">
          <h2>Portfolio</h2>
        </div>
        <div className="image-container">
          <Image
            src={cardImage}
            alt="old fashion catalog card image"
            width={300}
          />
        </div>
        <p>My projects on GitHub</p>

        {loading && (
          <div className="loading">
            <div className="spinner" />
            Loading...
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {!loading && !error && projects.map((project, index) => (
          
            <article className="repo" key={index}>
              <div className="repo-content">
                <h3 className="repo-title">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </a>
                </h3>
                <p className="repo-description">{project.description}</p>
                <div className="repo-meta">
                  <span className="repo-date">{formatDate(project.pushed_at)}</span>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="read-more">
                    Read More
                  </a>
                </div>
              </div>
            </article>
          
        ))}
        <p />
      </div>
    </>
  );
}
