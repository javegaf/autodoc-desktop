// Detecta archivos clave dentro del árbol del repositorio

export function detectKeyFiles(tree: any[]) {
  const fileList = tree.map(t => t.path);

  return {
    hasReadme: fileList.includes("README.md"),
    hasLicense: fileList.includes("LICENSE") || fileList.includes("LICENSE.md"),
    hasContributing: fileList.includes("CONTRIBUTING.md"),

    // Archivos Node.js / JavaScript
    hasPackageJson: fileList.includes("package.json"),
    hasTsConfig: fileList.includes("tsconfig.json"),

    // Archivos Python
    hasRequirements: fileList.includes("requirements.txt"),
    hasPyProject: fileList.includes("pyproject.toml"),

    // Docker
    hasDockerfile: fileList.includes("Dockerfile"),
    hasDockerCompose: fileList.includes("docker-compose.yml"),

    // Variables de entorno
    hasEnvExample: fileList.includes(".env.example"),

    // Carpetas clave detectadas
    hasSrcFolder: fileList.some(path => path.startsWith("src/")),
    hasDocsFolder: fileList.some(path => path.startsWith("docs/")),
  };
}
