type KeyFilesProps = {
  detected: any;
};

export function KeyFiles({ detected }: KeyFilesProps) {
  const items = [
    { label: "README.md", value: detected.hasReadme },
    { label: "LICENSE / LICENSE.md", value: detected.hasLicense },
    { label: "CONTRIBUTING.md", value: detected.hasContributing },

    { label: "package.json", value: detected.hasPackageJson },
    { label: "tsconfig.json", value: detected.hasTsConfig },

    { label: "requirements.txt", value: detected.hasRequirements },
    { label: "pyproject.toml", value: detected.hasPyProject },

    { label: "Dockerfile", value: detected.hasDockerfile },
    { label: "docker-compose.yml", value: detected.hasDockerCompose },

    { label: ".env.example", value: detected.hasEnvExample },

    { label: "Carpeta src/", value: detected.hasSrcFolder },
    { label: "Carpeta docs/", value: detected.hasDocsFolder },
  ];

  return (
    <div
      style={{
        marginTop: "2rem",
        background: "#f9fafb",
        padding: "1.5rem",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Archivos Clave Detectados</h2>

      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {items.map((item) => (
          <li
            key={item.label}
            style={{
              marginBottom: "0.6rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item.value ? (
              <span style={{ color: "green", fontSize: "1.3rem", marginRight: "0.5rem" }}>✔️</span>
            ) : (
              <span style={{ color: "red", fontSize: "1.3rem", marginRight: "0.5rem" }}>❌</span>
            )}
            
            <span
              style={{
                color: item.value ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {item.value ? "Lo contiene" : "No lo tiene"}
            </span>

            <span style={{ marginLeft: "0.5rem" }}>({item.label})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
