import { parseGithubUrl } from "./githubParser";

export async function fetchRepoInfo(repoUrl: string) {
  const parsed = parseGithubUrl(repoUrl);

  if (!parsed) {
    return { error: "URL inválida" };
  }

  const { user, repo } = parsed;

  try {
    const response = await fetch(`https://api.github.com/repos/${user}/${repo}`);

    if (!response.ok) {
      return { error: "Repositorio no encontrado o límite de API alcanzado" };
    }

    const data = await response.json();

    return {
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      stars: data.stargazers_count,
      watchers: data.watchers_count,
      forks: data.forks_count,
      language: data.language,
      topics: data.topics,
      license: data.license?.name || "Sin licencia",
      updated: data.updated_at,
    };
  } catch (error) {
    return { error: "Error en la conexión" };
  }
}
