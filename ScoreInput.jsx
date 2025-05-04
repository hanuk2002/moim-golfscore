import React from "react";

const ScoreInput = ({ groupId, onScoreChange }) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>{groupId.replace("group", "Group ")} - Score Input</h2>
      <div style={{ display: "flex", gap: "2px", marginBottom: "5px", marginLeft: "88px" }}>
        {[...Array(18)].map((_, i) => (
          <div key={i} style={{ width: "30px", textAlign: "center", fontWeight: "bold" }}>{i + 1}</div>
        ))}
      </div>
      {[...Array(4)].map((_, playerIndex) => (
        <div key={playerIndex} style={{ marginBottom: "6px", display: "flex", gap: "2px" }}>
          <input placeholder={`Player ${playerIndex + 1} Name`} style={{ width: "150px" }} />
          {[...Array(18)].map((_, holeIndex) => (
            <input key={holeIndex} style={{ width: "30px", textAlign: "center" }}
              onChange={(e) => onScoreChange(groupId, `player${playerIndex + 1}`, holeIndex, e.target.value)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScoreInput;