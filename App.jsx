import React, { useState } from 'react';
import './index.css';
import { generateBackupData, downloadJSON } from './jsonBackup';

const GolfScoreInput = ({ groupNumber }) => {
  const [scores, setScores] = useState(Array(4).fill().map(() => Array(18).fill('')));
  const [names, setNames] = useState(Array(4).fill(''));

  const handleScoreChange = (playerIdx, holeIdx, value) => {
    const updatedScores = [...scores];
    updatedScores[playerIdx][holeIdx] = value;
    setScores(updatedScores);
  };

  const handleNameChange = (playerIdx, value) => {
    const updatedNames = [...names];
    updatedNames[playerIdx] = value;
    setNames(updatedNames);
  };

  const handleBackup = () => {
    const backupData = {
      group: groupNumber,
      players: names.map((name, i) => ({ name, scores: scores[i] })),
    };
    const jsonString = generateBackupData(backupData);
    if (jsonString) downloadJSON(jsonString, `group${groupNumber}_golfscore_backup.json`);
  };

  return (
    <div>
      <h2>Group {groupNumber} - Score Input</h2>
      <div className="hole-numbers">
        <span className="name-cell"></span>
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} className={`hole-label ${i === 0 ? 'first-hole' : ''}`}>{i + 1}</span>
        ))}
      </div>
      {scores.map((scoreRow, playerIdx) => (
        <div key={playerIdx} className="player-row">
          <input
            type="text"
            value={names[playerIdx]}
            onChange={(e) => handleNameChange(playerIdx, e.target.value)}
            placeholder={`Player ${playerIdx + 1} Name`}
            className="name-input"
          />
          {scoreRow.map((score, holeIdx) => (
            <input
              key={holeIdx}
              type="text"
              value={score}
              onChange={(e) => handleScoreChange(playerIdx, holeIdx, e.target.value)}
              className="score-input"
            />
          ))}
        </div>
      ))}
      <button onClick={handleBackup}>Backup JSON</button>
    </div>
  );
};

const App = () => {
  const [groupCount, setGroupCount] = useState(0);
  const [start, setStart] = useState(false);

  return (
    <div>
      <h1>Moim Golfscore</h1>
      {!start ? (
        <div>
          <label>Select number of groups (1-10): </label>
          <input
            type="number"
            min="1"
            max="10"
            value={groupCount}
            onChange={(e) => setGroupCount(Number(e.target.value))}
          />
          <button onClick={() => setStart(true)}>Start Scoring</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setStart(false)}>Back to Main</button>
          {Array.from({ length: groupCount }, (_, i) => (
            <GolfScoreInput key={i} groupNumber={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
