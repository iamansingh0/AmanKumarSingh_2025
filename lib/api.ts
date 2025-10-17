// GitHub API utilities - fetch pinned/starred repos
export async function fetchGitHubPinnedRepos(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6&type=owner`)
    if (!response.ok) throw new Error("Failed to fetch GitHub repos")
    return response.json()
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return []
  }
}

// Hashnode API utilities - fixed endpoint
export async function fetchHashnodePosts(username: string) {
  try {
    const query = `
      query Publication($host: String!) {
        publication(host: $host) {
          posts(first: 10) {
            edges {
              node {
                id
                title
                brief
                url
                publishedAt
                readTimeInMinutes
                coverImage {
                  url
                }
                tags {
                  name
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          host: `${username}.hashnode.dev`,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Hashnode API error:", response.status, errorText)
      return []
    }

    const data = await response.json()

    if (data.errors) {
      console.error("[v0] Hashnode GraphQL errors:", data.errors)
      return []
    }

    const posts = data.data?.publication?.posts?.edges || []
    return posts.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      brief: node.brief,
      url: node.url,
      coverImage:
        node.coverImage?.url || "https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png",
      publishedAt: new Date(node.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      readTime: `${node.readTimeInMinutes} min read`,
      tags: node.tags?.map((tag: any) => tag.name) || [],
    }))
  } catch (error) {
    console.error("[v0] Error fetching Hashnode posts:", error)
    return []
  }
}

// WakaTime API utilities
export async function fetchWakaTimeStats(apiKey: string) {
  try {
    const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
      headers: { Authorization: `Bearer ${apiKey}` },
    })

    if (!response.ok) throw new Error("Failed to fetch WakaTime stats")
    return response.json()
  } catch (error) {
    console.error("Error fetching WakaTime stats:", error)
    return null
  }
}
