import React from 'react';

const ScoreInput = ({ groupNumber }) => {
  const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

  return (
    <div className="group-container">
      <h2>Group {groupNumber} - Score Input</h2>

      {/* 홀 번호 라벨 */}
      <div className="hole-label-row">
        <div className="empty-name-cell" />
        {[...Array(18)].map((_, holeIdx) => (
          <div key={holeIdx} className="hole-number">{holeIdx + 1}</div>
        ))}
      </div>

      {/* 4명의 플레이어 입력 필드 */}
      {players.map((label, pIdx) => (
        <div key={pIdx} className="player-row">
          <input className="player-name" placeholder={`${label} Name`} />
          {[...Array(18)].map((_, hIdx) => (
            <input
              key={hIdx}
              className="score-input"
              type="number"
              min="-9"
              max="99"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScoreInput;
