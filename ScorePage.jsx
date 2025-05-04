import { useState } from 'react';

function ScorePage() {
  const [scores, setScores] = useState(Array(4).fill({ name: '', holes: Array(18).fill('') }));

  const handleNameChange = (index, value) => {
    const updated = [...scores];
    updated[index].name = value;
    setScores(updated);
  };

  const handleScoreChange = (playerIdx, holeIdx, value) => {
    const updated = [...scores];
    updated[playerIdx].holes[holeIdx] = value;
    setScores(updated);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Group 1 - Score Input</h2>
      {scores.map((player, i) => (
        <div key={i} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder={`Player ${i + 1} Name`}
            value={player.name}
            onChange={(e) => handleNameChange(i, e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <div>
            {player.holes.map((hole, j) => (
              <input
                key={j}
                type="number"
                value={hole}
                onChange={(e) => handleScoreChange(i, j, e.target.value)}
                style={{ width: '40px', margin: '2px' }}
                placeholder={j + 1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScorePage;
