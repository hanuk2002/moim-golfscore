import { useState } from "react";

const TOTAL_HOLES = 18;
const GROUPS = Array.from({ length: 10 }, (_, i) => `G${i + 1}`);
const DEFAULT_PAR = Array.from({ length: TOTAL_HOLES }, () => 4);

export default function App() {
  const [group, setGroup] = useState("G1");
  const [players, setPlayers] = useState(["", "", "", ""]);
  const [parValues, setParValues] = useState(DEFAULT_PAR);
  const [scores, setScores] = useState(
    Array.from({ length: 4 }, () => Array(TOTAL_HOLES).fill(""))
  );
  const [tab, setTab] = useState("front");

  const handleScoreChange = (playerIdx, holeIdx, value) => {
    const v = parseInt(value, 10);
    if (isNaN(v) || v < -5 || v > 5) return;
    const updated = [...scores];
    updated[playerIdx][holeIdx] = v;
    setScores(updated);
  };

  const handleParChange = (holeIdx, value) => {
    const v = parseInt(value, 10);
    if (isNaN(v) || v < 3 || v > 5) return;
    const updated = [...parValues];
    updated[holeIdx] = v;
    setParValues(updated);
  };

  const getTotalScore = (playerIdx) => {
    return scores[playerIdx].reduce((acc, val, idx) => {
      const par = parValues[idx] || 4;
      return acc + (typeof val === "number" ? par + val : par);
    }, 0);
  };

  const handleDownload = () => {
    const data = {
      group,
      players,
      parValues,
      scores,
    };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${group}_scorecard.json`;
    a.click();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Golf Scorecard</h1>

      <div className="mb-4">
        <label>Group: </label>
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          {GROUPS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {players.map((name, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Player ${i + 1}`}
            value={name}
            onChange={(e) => {
              const updated = [...players];
              updated[i] = e.target.value;
              setPlayers(updated);
            }}
            className="border p-2"
          />
        ))}
      </div>

      <div className="mb-4">
        <strong>Hole Pars (3~5):</strong>
        <div className="grid grid-cols-9 gap-2 mt-2">
          {(tab === "front" ? parValues.slice(0, 9) : parValues.slice(9)).map(
            (val, i) => (
              <input
                key={i + (tab === "back" ? 9 : 0)}
                type="number"
                min={3}
                max={5}
                value={val}
                onChange={(e) =>
                  handleParChange(i + (tab === "back" ? 9 : 0), e.target.value)
                }
                className="border p-1 text-center"
              />
            )
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab("front")}>전반 (1~9홀)</button>
        <button onClick={() => setTab("back")}>후반 (10~18홀)</button>
      </div>

      {players.map((player, pIdx) => (
        <div key={pIdx} className="mb-4">
          <h2 className="font-semibold mb-1">{player || `Player ${pIdx + 1}`}</h2>
          <div className="grid grid-cols-9 gap-2">
            {(tab === "front"
              ? scores[pIdx].slice(0, 9)
              : scores[pIdx].slice(9)).map((val, hIdx) => (
              <input
                key={hIdx + (tab === "back" ? 9 : 0)}
                type="number"
                min={-5}
                max={5}
                value={val}
                placeholder="±"
                onChange={(e) =>
                  handleScoreChange(
                    pIdx,
                    hIdx + (tab === "back" ? 9 : 0),
                    e.target.value
                  )
                }
                className="border p-1 text-center"
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-600">총점: {getTotalScore(pIdx)}타</p>
        </div>
      ))}

      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        JSON으로 저장하기
      </button>
    </div>
  );
}
