import { useState } from "react";
import "./App.css";
import GameBoard from "./GameBoard";
function App() {
  const [win, setWin] = useState(null);
  return (
    <>
      <h1>Tic Toe Game</h1>
      <GameBoard win={win} setWin={setWin} />
    </>
  );
}

export default App;
