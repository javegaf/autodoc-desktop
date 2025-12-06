// Extrae "usuario" y "repositorio" desde un link de GitHub.
// Ejemplo: https://github.com/javegaf/autodoc-desktop
// Retorna: { user: "javegaf", repo: "autodoc-desktop" }

export function parseGithubUrl(url: string) {
  try {
    const cleaned = url.trim();

    if (!cleaned.startsWith("https://github.com/")) {
      return null;
    }

    const parts = cleaned.replace("https://github.com/", "").split("/");

    if (parts.length < 2) {
      return null;
    }

    return {
      user: parts[0],
      repo: parts[1],
    };
  } catch {
    return null;
  }
}
