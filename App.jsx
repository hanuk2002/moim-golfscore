import React, { useState } from "react";

function PlayerInput({ playerIndex }) {
  const [scores, setScores] = useState(Array(18).fill(""));

  const handleScoreChange = (index, value) => {
    const updated = [...scores];
    updated[index] = value;
    setScores(updated);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <input placeholder={`Player ${playerIndex + 1} Name`} />
      <div style={{ display: "flex", marginTop: "0.5rem" }}>
        {scores.map((_, i) => (
          <div
            key={`label-${i}`}
            style={{ width: "30px", textAlign: "center", fontWeight: "bold" }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "2px" }}>
        {scores.map((score, i) => (
          <input
            key={i}
            type="text"
            value={score}
            onChange={(e) => handleScoreChange(i, e.target.value)}
            style={{ width: "30px" }}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div>
      <h1>Moim Golfscore</h1>
      {!started ? (
        <>
          <p>This is the beginning of something fun!</p>
          <button onClick={() => setStarted(true)}>Start Scoring</button>
        </>
      ) : (
        <div>
          <h2>Group 1 - Score Input</h2>
          {[...Array(4)].map((_, i) => (
            <PlayerInput key={i} playerIndex={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;