import React, { useState } from "react";
import "./index.css";

const NUM_HOLES = 18;
const NUM_PLAYERS = 4;

function ScoreInput({ groupIndex, groupData, updatePlayerName, updateScore }) {
  return (
    <div className="group-container">
      <h2>Group {groupIndex + 1} - Score Input</h2>
      <div className="hole-numbers">
        <div className="label-cell" />
        {[...Array(NUM_HOLES)].map((_, holeIdx) => (
          <div className="hole-number" key={holeIdx}>{holeIdx + 1}</div>
        ))}
      </div>
      {groupData.players.map((player, playerIdx) => (
        <div className="player-row" key={playerIdx}>
          <input
            className="name-input"
            type="text"
            placeholder={`Player ${playerIdx + 1} Name`}
            value={player.name}
            onChange={(e) => updatePlayerName(groupIndex, playerIdx, e.target.value)}
          />
          {[...Array(NUM_HOLES)].map((_, holeIdx) => (
            <input
              key={holeIdx}
              type="number"
              className="score-input"
              value={player.scores[holeIdx] ?? ""}
              onChange={(e) =>
                updateScore(groupIndex, playerIdx, holeIdx, e.target.value)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [numGroups, setNumGroups] = useState(3);
  const [scoreData, setScoreData] = useState(
    Array.from({ length: numGroups }, () => ({
      players: Array.from({ length: NUM_PLAYERS }, () => ({
        name: "",
        scores: Array(NUM_HOLES).fill(""),
      })),
    }))
  );

  const updatePlayerName = (groupIdx, playerIdx, name) => {
    const newData = structuredClone(scoreData);
    newData[groupIdx].players[playerIdx].name = name;
    setScoreData(newData);
  };

  const updateScore = (groupIdx, playerIdx, holeIdx, value) => {
    const newData = structuredClone(scoreData);
    newData[groupIdx].players[playerIdx].scores[holeIdx] = value;
    setScoreData(newData);
  };

  return (
    <div className="app-container">
      <h1>Moim Golfscore</h1>
      {scoreData.map((group, idx) => (
        <ScoreInput
          key={idx}
          groupIndex={idx}
          groupData={group}
          updatePlayerName={updatePlayerName}
          updateScore={updateScore}
        />
      ))}
    </div>
  );
}

export default App;