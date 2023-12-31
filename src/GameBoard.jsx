import { useState, useEffect } from "react";

export default function GameBoard({ win, setWin }) {
  const [boxes, setBoxes] = useState(generateBoxes());
  const [toggleChoice, setToggleChoice] = useState(false);
  const [turn, setTurn] = useState("");

  useEffect(() => {
    setTurn(toggleChoice ? "X" : "O");
  }, [toggleChoice]);

  function generateBoxes() {
    let arr = [];
    for (var i = 0; i < 9; i++) {
      arr.push({ type: null });
    }
    return arr;
  }

  const handleChoose = (index) => {
    const allBoxes = boxes;
    const selectedBox = allBoxes[index].type;
    const nullBoxes = allBoxes.every((box) => box.type !== null);

    // check if someone has already won the game
    if (win) return;
    // check that every item is not null if there aren't any null boxes then return
    if (nullBoxes) return;
    // if box already have cross or circle then return;
    if (selectedBox) return;

    allBoxes[index].type = turn;
    setTurn((prev) => {
      if (prev === "O") {
        return "X";
      } else {
        return "O";
      }
    });
    setBoxes(allBoxes);
    checkWinner();
  };

  const checkWinner = () => {
    const winCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winCases.forEach((cases) => {
      let circleWins = cases.every((arr) => boxes[arr].type === "O");
      let crossWins = cases.every((arr) => boxes[arr].type === "X");

      if (circleWins) {
        setWin("Circle Wins");
      } else if (crossWins) {
        setWin("Cross Wins");
      } else {
        return;
      }
    });
  };

  const handleReset = () => {
    setBoxes(generateBoxes());
    setWin(null);
    setToggleChoice(false);
  };

  const handleToggle = () => {
    const checkBox = boxes.every((box) => box.type === null);
    if (!checkBox) return;
    setToggleChoice((prev) => !prev);
  };

  return (
    <div className="game--container">
      <div className="turn-container">
        <span className="turn">{win ? win : turn + "' Turn"}</span>

        <button
          disabled={!boxes.every((box) => box.type === null)}
          aria-disabled={!boxes.every((box) => box.type === null)}
          onClick={handleToggle}
          className="toggle-btn"
        >
          Change Choice
        </button>
      </div>
      <div className="game--wrapper">
        {boxes.map((box, index) => (
          <div
            key={index}
            onClick={() => handleChoose(index)}
            className={`gamebox ${
              box.type ? (box.type === "O" ? "circle" : "cross") : ""
            }`}
          >
            <div className="choose"></div>
          </div>
        ))}
      </div>
      {/* Reset Button */}
      <div className="buttonContainer">
        <button onClick={handleReset} className="resetBtn">
          Reset Button
        </button>
      </div>
    </div>
  );
}
