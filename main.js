
import { generateBackupData, downloadJSON } from './jsonBackup.js';

const scoreData = {};
const holeNumbersDiv = document.getElementById("holeNumbers");
const scoreInputsDiv = document.getElementById("scoreInputs");

// Render hole numbers
for (let i = 1; i <= 18; i++) {
  const input = document.createElement("input");
  input.value = i;
  input.readOnly = true;
  holeNumbersDiv.appendChild(input);
}

// Render players
for (let p = 1; p <= 4; p++) {
  const row = document.createElement("div");
  row.className = "score-row";

  const nameInput = document.createElement("input");
  nameInput.placeholder = `Player ${p} Name`;
  row.appendChild(nameInput);

  for (let h = 1; h <= 18; h++) {
    const scoreInput = document.createElement("input");
    scoreInput.type = "number";
    scoreInput.dataset.player = p;
    scoreInput.dataset.hole = h;
    scoreInput.addEventListener("input", () => {
      const playerName = nameInput.value || `Player ${p}`;
      if (!scoreData[playerName]) scoreData[playerName] = {};
      scoreData[playerName][`Hole ${h}`] = scoreInput.value;
    });
    row.appendChild(scoreInput);
  }

  scoreInputsDiv.appendChild(row);
}

function backupJSON() {
  const json = generateBackupData(scoreData);
  if (json) downloadJSON(json);
}

function goBack() {
  alert("Back to Main (insert navigation logic)");
}
