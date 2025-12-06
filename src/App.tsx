import { useState } from "react";

function App() {
  const [repoUrl, setRepoUrl] = useState("");

  const handleAnalyze = () => {
    console.log("Analizando repositorio:", repoUrl);
    // Aquí luego llamaremos a la API de GitHub
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AutoDoc Desktop</h1>

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
        style={{
          marginTop: "1rem",
          padding: "0.7rem 1.4rem",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Analizar Repositorio
      </button>
    </div>
  );
}

export default App;
