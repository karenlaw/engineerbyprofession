import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GIT_TOKEN,
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Read a specific parameter
  const maxRepos = parseInt(searchParams.get('maxRepos') || '5', 10);

  try {
    const res = await octokit.paginate("GET /user/repos", { type: "public", per_page: maxRepos  });
    console.log(res)
    return NextResponse.json({items:
      res.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        pushed_at: repo.pushed_at,
      }))
    })
  } catch (e) {
      console.error("Error fetching repos:", e);
    return NextResponse.json({ error: "Failed to fetch repos" }, { status: 500 });
  }
}
