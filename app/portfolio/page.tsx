"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
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

async function fetchRepos(maxRepos = 5): Promise<Repo[]> {
  const res = await octokit.paginate("GET /user/repos", { type: "public" });
  return res.slice(0, maxRepos).map((item: any) => ({
    name: item.name || "No title",
    clone_url: item.clone_url || "#",
    created_at: item.created_at || "",
    description: item.description || "",
  }));
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
                <a className="repo-name" href={project.clone_url} target="_blank" rel="noopener noreferrer">
                  {project.name}
                </a>
              </h3>
            </div>
          </article>
        ))}
        <p />
      </div>
    </>
  );
}
