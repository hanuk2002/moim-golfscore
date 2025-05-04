import React, { useState } from "react";
import ScoreInput from "./ScoreInput";
import { downloadJSON } from "./jsonBackup";

function App() {
  const [groupCount, setGroupCount] = useState(3);
  const [scores, setScores] = useState({});

  const handleScoreChange = (groupId, playerId, holeIndex, value) => {
    setScores((prev) => {
      const updated = { ...prev };
      if (!updated[groupId]) updated[groupId] = {};
      if (!updated[groupId][playerId]) updated[groupId][playerId] = Array(18).fill("");
      updated[groupId][playerId][holeIndex] = value;
      return updated;
    });
  };

  const handleBackup = () => {
    localStorage.setItem("golfScores", JSON.stringify(scores));
    downloadJSON(JSON.stringify(scores, null, 2));
  };

  return (
    <div>
      <h1>Moim Golfscore</h1>
      {[...Array(groupCount)].map((_, i) => (
        <ScoreInput key={i} groupId={`group${i + 1}`} onScoreChange={handleScoreChange} />
      ))}
      <button onClick={handleBackup}>백업(JSON 저장)</button>
    </div>
  );
}

export default App;