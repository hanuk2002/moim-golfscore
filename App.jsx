import React, { useState } from "react";
import "./index.css";

const NUM_HOLES = 18;
const NUM_PLAYERS = 4;

function ScoreInput({ groupIndex }) {
  const [players, setPlayers] = useState(Array(NUM_PLAYERS).fill({ name: "", scores: Array(NUM_HOLES).fill("") }));

  const handleInputChange = (playerIdx, holeIdx, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIdx] = {
      ...updatedPlayers[playerIdx],
      scores: [...updatedPlayers[playerIdx].scores]
    };
    updatedPlayers[playerIdx].scores[holeIdx] = value;
    setPlayers(updatedPlayers);
  };

  const handleNameChange = (playerIdx, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIdx] = {
      ...updatedPlayers[playerIdx],
      name: value
    };
    setPlayers(updatedPlayers);
  };

  return (
    <div className="group">
      <h2>Group {groupIndex + 1} - Score Input</h2>
      <div className="hole-numbers">
        {Array.from({ length: NUM_HOLES }, (_, holeIdx) => (
          <div className="hole-number" key={holeIdx}>{holeIdx + 1}</div>
        ))}
      </div>
      {players.map((player, playerIdx) => (
        <div className="player-row" key={playerIdx}>
          <input
            type="text"
            value={player.name}
            onChange={(e) => handleNameChange(playerIdx, e.target.value)}
            placeholder={\`Player \${playerIdx + 1} Name\`}
          />
          {Array.from({ length: NUM_HOLES }, (_, holeIdx) => (
            <input
              type="text"
              key={holeIdx}
              value={player.scores[holeIdx]}
              onChange={(e) => handleInputChange(playerIdx, holeIdx, e.target.value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [groupCount, setGroupCount] = useState(1);

  const handleGroupSelect = (e) => {
    setGroupCount(parseInt(e.target.value));
  };

  const saveScores = () => {
    const scores = [];
    for (let g = 0; g < groupCount; g++) {
      const groupEl = document.querySelectorAll(".group")[g];
      const playerRows = groupEl.querySelectorAll(".player-row");
      const groupData = [];
      playerRows.forEach((row) => {
        const inputs = row.querySelectorAll("input");
        const name = inputs[0].value;
        const scores = Array.from(inputs).slice(1).map((input) => input.value);
        groupData.push({ name, scores });
      });
      scores.push({ group: g + 1, players: groupData });
    }
    localStorage.setItem("golfScores", JSON.stringify(scores));
    alert("스코어가 저장되었습니다!");
  };

  return (
    <div>
      <h1>Moim Golfscore</h1>
      <div>
        <label>Select Number of Groups: </label>
        <select onChange={handleGroupSelect} value={groupCount}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>
      {Array.from({ length: groupCount }, (_, groupIdx) => (
        <ScoreInput key={groupIdx} groupIndex={groupIdx} />
      ))}
      <button onClick={saveScores}>Save Scores</button>
    </div>
  );
}