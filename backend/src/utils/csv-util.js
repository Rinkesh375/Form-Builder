export function convertToCSV(data) {
  if (!data || data.length === 0) return "";

  const headers = Object.keys(data[0]).join(",");

  const rows = data
    .map((row) =>
      Object.values(row)
        .map((value) =>
          typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value
        )
        .join(",")
    )
    .join("\n");

  return `${headers}\n${rows}`;
}
