export function generateBackupData(scoreData) {
  try {
    const jsonString = JSON.stringify(scoreData, null, 2);
    return jsonString;
  } catch (error) {
    console.error("Error generating JSON backup:", error);
    return null;
  }
}

export function downloadJSON(jsonString, filename = "golfscore_backup.json") {
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}