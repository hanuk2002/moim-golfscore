
import { generateBackupData, downloadJSON } from './jsonBackup.js';

const app = document.getElementById('app');

function createScoreUI(groupCount = 1) {
  app.innerHTML = '';

  for (let g = 1; g <= groupCount; g++) {
    const groupDiv = document.createElement('div');
    groupDiv.innerHTML = `<h2>Group ${g} - Score Input</h2>`;

    const headerRow = document.createElement('div');
    headerRow.style.display = 'flex';
    headerRow.innerHTML = '<div style="width: 120px;"></div>' + Array.from({ length: 18 }, (_, i) => `<div style="width: 30px; text-align: center;">${i + 1}</div>`).join('');
    groupDiv.appendChild(headerRow);

    for (let p = 1; p <= 4; p++) {
      const row = document.createElement('div');
      row.style.display = 'flex';

      const nameInput = document.createElement('input');
      nameInput.placeholder = `Player ${p} Name`;
      nameInput.style.width = '120px';
      row.appendChild(nameInput);

      for (let h = 0; h < 18; h++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.dataset.group = g;
        input.dataset.player = p;
        input.dataset.hole = h + 1;
        row.appendChild(input);
      }

      groupDiv.appendChild(row);
    }

    app.appendChild(groupDiv);
  }

  const backupButton = document.createElement('button');
  backupButton.textContent = 'Backup JSON';
  backupButton.onclick = () => {
    const scoreInputs = document.querySelectorAll('input[type="text"]');
    const scoreData = {};

    scoreInputs.forEach(input => {
      const g = input.dataset.group;
      const p = input.dataset.player;
      const h = input.dataset.hole;

      scoreData[g] = scoreData[g] || {};
      scoreData[g][p] = scoreData[g][p] || {};
      scoreData[g][p][h] = input.value;
    });

    const json = generateBackupData(scoreData);
    if (json) downloadJSON(json);
  };
  app.appendChild(backupButton);
}

createScoreUI(1);
