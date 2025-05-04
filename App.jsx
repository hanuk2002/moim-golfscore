
import React, { useState } from 'react';
import PlayerInput from './PlayerInput';

function App() {
  const [group1, setGroup1] = useState([
    Array(18).fill(''),
    Array(18).fill(''),
    Array(18).fill(''),
    Array(18).fill(''),
  ]);

  const handleScoreChange = (playerIndex, holeIndex, value) => {
    const newGroup = [...group1];
    newGroup[playerIndex][holeIndex] = value;
    setGroup1(newGroup);
  };

  return (
    <div>
      <h2>Group 1 - Score Input</h2>
      {group1.map((scores, index) => (
        <PlayerInput
          key={index}
          playerIndex={index}
          scores={scores}
          onScoreChange={handleScoreChange}
        />
      ))}
    </div>
  );
}

export default App;
