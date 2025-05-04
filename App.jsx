import React, { useState } from "react";
import { generateBackupData, downloadJSON } from "./jsonBackup";

const App = () => {
  const [view, setView] = useState("main");
  const [groupCount, setGroupCount] = useState(1);
  const [scores, setScores] = useState({});

  const handleInputChange = (group, player, hole, value) => {
    setScores(prev => {
      const updated = { ...prev };
      if (!updated[group]) updated[group] = {};
      if (!updated[group][player]) updated[group][player] = {};
      updated[group][player][hole] = value;
      return updated;
    });
  };

  const handleBackup = () => {
    const json = generateBackupData(scores);
    if (json) downloadJSON(json);
  };

  if (view === "main") {
    return (
      <div>
        <h1>Moim Golfscore</h1>
        <label>
          Select Number of Groups (1–10):{" "}
          <input
            type="number"
            min="1"
            max="10"
            value={groupCount}
            onChange={e => setGroupCount(parseInt(e.target.value))}
          />
        </label>
        <br />
        <button onClick={() => setView("score")}>Start Scoring</button>
      </div>
    );
  }

  const holeHeader = (
    <div style={{ display: "flex", marginLeft: "160px", gap: "4px" }}>
      {[...Array(18)].map((_, i) => (
        <div key={i} style={{ width: "40px", textAlign: "center", fontWeight: "bold" }}>
          {i + 1}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h1>Moim Golfscore</h1>
      <button onClick={() => setView("main")}>Back to Main</button>
      {[...Array(groupCount)].map((_, gIdx) => (
        <div key={gIdx}>
          <h2>Group {gIdx + 1} - Score Input</h2>
          {holeHeader}
          {[...Array(4)].map((_, pIdx) => (
            <div key={pIdx} style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
              <input
                type="text"
                placeholder={`Player ${pIdx + 1} Name`}
                style={{ width: "150px" }}
              />
              {[...Array(18)].map((_, hIdx) => (
                <input
                  key={hIdx}
                  type="text"
                  style={{ width: "40px" }}
                  onChange={e =>
                    handleInputChange(gIdx + 1, pIdx + 1, hIdx + 1, e.target.value)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleBackup}>Backup JSON</button>
    </div>
  );
};

export default App;