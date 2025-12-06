import { useState } from "react";
import { parseGithubUrl } from "./services/githubParser";
import { fetchRepoInfo } from "./services/githubApi";
import { RepoInfo } from "./components/RepoInfo";
import { fetchRepoTree } from "./services/githubTree";
import { RepoTree } from "./components/RepoTree";
import { KeyFiles } from "./components/KeyFiles";
import { detectKeyFiles } from "./services/fileDetector";
import { generateReadme } from "./services/readmeGenerator";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [repoInfo, setRepoInfo] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [repoTree, setRepoTree] = useState<any[]>([]);
  const [keyFiles, setKeyFiles] = useState<any | null>(null);
  const [generatedReadme, setGeneratedReadme] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setErrorMessage("");
    setRepoInfo(null);
    setRepoTree([]);
    setKeyFiles(null);

    // Validar URL
    const parsed = parseGithubUrl(repoUrl);
    if (!parsed) {
      setErrorMessage("URL inválida. Debe ser un enlace válido de GitHub.");
      setLoading(false);
      return;
    }

    // 1. Obtener información básica
    const info = await fetchRepoInfo(repoUrl);
    if (info.error) {
      setErrorMessage(info.error);
      setLoading(false);
      return;
    }
    setRepoInfo(info);

    // 2. Obtener estructura del repositorio (árbol)
    const tree = await fetchRepoTree(repoUrl);
    if (tree.error) {
      console.log("Error obteniendo el árbol:", tree.error);
    } else {
      console.log("Árbol del repositorio:", tree);
      setRepoTree(tree.files);

      // Detectar archivos clave
      const detected = detectKeyFiles(tree.files);
      setKeyFiles(detected);
      console.log("Archivos clave detectados:", detected);
      // Generar README si se detectaron archivos clave
      const markdown = generateReadme(info, detected, tree.files);
      setGeneratedReadme(markdown);
      console.log("README generado:", markdown);

    }

    setLoading(false);
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>AutoDoc Desktop</h1>

      <label style={{ display: "block", marginTop: "1rem" }}>
        URL del repositorio de GitHub:
      </label>

      <input
        type="text"
        placeholder="https://github.com/usuario/repositorio"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginTop: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.7rem 1.4rem",
          backgroundColor: loading ? "#818cf8" : "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "1rem",
        }}
      >
        {loading ? "Analizando..." : "Analizar Repositorio"}
      </button>

      {/* Mensaje de error */}
      {errorMessage && (
        <p style={{ color: "red", marginTop: "1rem" }}>⚠️ {errorMessage}</p>
      )}

      {/* Información del repositorio */}
      {repoInfo && <RepoInfo info={repoInfo} />}

      {/* Árbol del repositorio */}
      {repoTree.length > 0 && <RepoTree tree={repoTree} />}

      {/* Archivos clave detectados */}
      {keyFiles && <KeyFiles detected={keyFiles} />}

      {/* README generado */}
      {generatedReadme && (
        <div
          style={{
            marginTop: "2rem",
            background: "#111827",
            color: "#e5e7eb",
            padding: "1.5rem",
            borderRadius: "12px",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            fontSize: "0.9rem",
          }}
        >
          <h2>README Generado</h2>
          <pre>{generatedReadme}</pre>
        </div>
)}
    </div>
  );
}

export default App;
