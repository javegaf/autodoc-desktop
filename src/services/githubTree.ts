import { parseGithubUrl } from "./githubParser";

export async function fetchRepoTree(repoUrl: string) {
  const parsed = parseGithubUrl(repoUrl);
  if (!parsed) {
    return { error: "URL inválida" };
  }

  const { user, repo } = parsed;

  try {
    // Primero obtenemos la rama principal del repo
    const repoInfo = await fetch(`https://api.github.com/repos/${user}/${repo}`);
    const repoData = await repoInfo.json();

    const defaultBranch = repoData.default_branch || "main";

    // Luego obtenemos el árbol completo del repositorio
    const treeUrl = `https://api.github.com/repos/${user}/${repo}/git/trees/${defaultBranch}?recursive=1`;

    const treeRequest = await fetch(treeUrl);

    if (!treeRequest.ok) {
      return { error: "No se pudo obtener el árbol del repositorio." };
    }

    const treeData = await treeRequest.json();

    return {
      branch: defaultBranch,
      files: treeData.tree,
    };
  } catch (error) {
    return { error: "Error consultando el árbol del repositorio." };
  }
}
