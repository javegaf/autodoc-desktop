type RepoInfoProps = {
  info: any;
};

export function RepoInfo({ info }: RepoInfoProps) {
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
      <h2 style={{ marginBottom: "1rem" }}>Información del Repositorio</h2>

      <p>
        <strong>Nombre:</strong> {info.name}
      </p>

      <p>
        <strong>Descripción:</strong>{" "}
        {info.description || "Sin descripción"}
      </p>

      <p>
        <strong>Lenguaje principal:</strong>{" "}
        {info.language || "No detectado"}
      </p>

      <p>
        <strong>Estrellas:</strong> ⭐ {info.stars}
      </p>

      <p>
        <strong>Forks:</strong> {info.forks}
      </p>

      <p>
        <strong>Última actualización:</strong> {info.updated}
      </p>

      {info.topics?.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Temas:</strong>
          <ul>
            {info.topics.map((t: string) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}

      <p style={{ marginTop: "1rem", color: "#6b7280" }}>
        Licencia: {info.license}
      </p>
    </div>
  );
}
