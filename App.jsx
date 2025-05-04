import React, { useState } from 'react';
import './index.css';
import ScoreInput from './ScoreInput';

function App() {
  const [groupCount, setGroupCount] = useState(null);

  const handleStart = (count) => {
    setGroupCount(count);
  };

  return (
    <div className="app-container">
      <h1>Moim Golfscore</h1>
      {!groupCount ? (
        <div>
          <p>Select number of groups:</p>
          {[...Array(10)].map((_, i) => (
            <button key={i} onClick={() => handleStart(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      ) : (
        [...Array(groupCount)].map((_, i) => (
          <ScoreInput key={i} groupNumber={i + 1} />
        ))
      )}
    </div>
  );
}

export default App;
