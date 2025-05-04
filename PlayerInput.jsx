
function PlayerInput({ playerIndex, scores, onScoreChange }) {
  return (
    <div>
      <input placeholder={`Player ${playerIndex + 1} Name`} />
      <div>
        {scores.map((score, holeIndex) => (
          <input
            key={holeIndex}
            value={score}
            onChange={(e) => onScoreChange(playerIndex, holeIndex, e.target.value)}
            style={{ width: '30px', margin: '2px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayerInput;
