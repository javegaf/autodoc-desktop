type RepoTreeProps = {
  tree: any[];
};

export function RepoTree({ tree }: RepoTreeProps) {
  // Ordenar: carpetas primero (type: "tree")
  const sortedTree = [...tree].sort((a, b) => {
    if (a.type === b.type) return a.path.localeCompare(b.path);
    return a.type === "tree" ? -1 : 1;
  });

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
        background: "#f3f4f6",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2>Estructura del Repositorio</h2>

      <ul style={{ listStyle: "none", paddingLeft: "1rem" }}>
        {sortedTree.map((item) => (
          <li key={item.sha} style={{ marginBottom: "0.4rem" }}>
            {item.type === "tree" ? "📁" : "📄"} {item.path}
          </li>
        ))}
      </ul>
    </div>
  );
}
