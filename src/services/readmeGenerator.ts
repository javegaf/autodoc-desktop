export function generateReadme(repoInfo: any, keyFiles: any, tree: any[]) {
  const { name, description, language, stars, forks, updated, topics } = repoInfo;

  const hasDocker = keyFiles.hasDockerfile || keyFiles.hasDockerCompose;

  // Obtener carpetas principales
  const mainFolders = tree
    .filter((item) => item.type === "tree" && !item.path.includes("/"))
    .map((f) => `- \`${f.path}/\``)
    .join("\n");

  return `
# ${name}

${description || "Proyecto sin descripción proporcionada."}

---

## 📦 Tecnologías Principales

- **Lenguaje:** ${language || "No detectado"}
- **Estrellas:** ⭐ ${stars}
- **Forks:** 🔱 ${forks}
- **Última actualización:** ${new Date(updated).toLocaleDateString()}

${topics?.length ? `**Temas:** ${topics.join(", ")}` : ""}

---

## 📁 Estructura Principal del Proyecto

${mainFolders || "_No se detectaron carpetas principales._"}

---

## 📄 Archivos Clave

| Archivo | Estado |
|--------|--------|
| README.md | ${keyFiles.hasReadme ? "✔️ Presente" : "❌ No encontrado"} |
| LICENSE | ${keyFiles.hasLicense ? "✔️ Presente" : "❌ No encontrado"} |
| CONTRIBUTING.md | ${keyFiles.hasContributing ? "✔️ Presente" : "❌ No encontrado"} |
| package.json | ${keyFiles.hasPackageJson ? "✔️ Presente" : "❌ No encontrado"} |
| tsconfig.json | ${keyFiles.hasTsConfig ? "✔️ Presente" : "❌ No encontrado"} |
| requirements.txt | ${keyFiles.hasRequirements ? "✔️ Presente" : "❌ No encontrado"} |
| pyproject.toml | ${keyFiles.hasPyProject ? "✔️ Presente" : "❌ No encontrado"} |
| Dockerfile | ${keyFiles.hasDockerfile ? "✔️ Presente" : "❌ No encontrado"} |
| docker-compose.yml | ${keyFiles.hasDockerCompose ? "✔️ Presente" : "❌ No encontrado"} |
| .env.example | ${keyFiles.hasEnvExample ? "✔️ Presente" : "❌ No encontrado"} |

---

## 🚀 Cómo ejecutar este proyecto

${
  keyFiles.hasPackageJson
    ? "### Proyecto Node.js / TypeScript\n```bash\nnpm install\nnpm run dev\n```"
    : keyFiles.hasRequirements
    ? "### Proyecto Python\n```bash\npip install -r requirements.txt\npython main.py\n```"
    : "_No se detectó una configuración estándar para ejecución._"
}

${
  hasDocker
    ? `### Ejecución con Docker\n\`\`\`bash\ndocker-compose up --build\n\`\`\`\n`
    : ""
}

---

## 🧪 Tests

${tree.some((f) => f.path.includes("test") || f.path.includes("__tests__"))
    ? "Este proyecto contiene pruebas automatizadas."
    : "No se detectaron pruebas automatizadas."
}

---

## 📄 Licencia

${
  keyFiles.hasLicense
    ? "Este repositorio contiene un archivo de licencia."
    : "⚠️ No se detectó archivo de licencia. Se recomienda agregar uno."
}

---

## ✨ Generado automáticamente con **AutoDoc Desktop**
`;
}
