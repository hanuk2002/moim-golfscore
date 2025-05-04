
import { generateBackupData, downloadJSON } from './jsonBackup.js';

const app = document.getElementById('app');

function createGroup(groupNumber) {
  const groupDiv = document.createElement('div');
  groupDiv.className = 'group';

  const title = document.createElement('h2');
  title.textContent = `Group ${groupNumber} - Score Input`;
  groupDiv.appendChild(title);

  const header = document.createElement('div');
  header.className = 'score-header';
  header.appendChild(document.createElement('div')); // empty spacer
  for (let i = 1; i <= 18; i++) {
    const cell = document.createElement('div');
    cell.textContent = i;
    header.appendChild(cell);
  }
  groupDiv.appendChild(header);

  for (let p = 0; p < 4; p++) {
    const playerRow = document.createElement('div');
    playerRow.className = 'player-row';

    const nameInput = document.createElement('input');
    nameInput.placeholder = `Player ${p + 1} Name`;
    nameInput.className = 'name-input';
    playerRow.appendChild(nameInput);

    for (let h = 0; h < 18; h++) {
      const scoreInput = document.createElement('input');
      scoreInput.type = 'number';
      playerRow.appendChild(scoreInput);
    }

    groupDiv.appendChild(playerRow);
  }

  return groupDiv;
}

// Render UI
app.innerHTML = '';
app.appendChild(createGroup(1));

// Backup button
const backupBtn = document.createElement('button');
backupBtn.textContent = 'Backup JSON';
backupBtn.onclick = () => {
  const scoreData = []; // Populate later if needed
  const json = generateBackupData(scoreData);
  if (json) {
    downloadJSON(json);
  }
};
app.appendChild(backupBtn);
