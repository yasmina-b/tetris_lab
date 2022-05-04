import React, { useCallback, useState } from "react";
import "./App.css";
import { GameContainer } from "./components/GameContainer";
import { useGameTime } from "./hooks/useGameTime";
import { RightPanel } from "./components/RightPanel";
import { TileBoard } from "./components/TileBoard";
import { useBoard } from "./hooks/useBoard";

function App() {

  const [speed, setSpeed] = useState(1000);
  const [updateBoard, board] = useBoard();

  const onTick = useCallback(() => {
    console.log("tic tic");
    updateBoard();
  },[]);
  
  const { isRunning, startTime, stopTime } = useGameTime({ onTick, speed});

  return (
    <GameContainer>
      <TileBoard board={board} />
      <RightPanel>
        <button onClick={startTime} disabled={isRunning}>
          START
        </button>
        <button onClick={stopTime} disabled={!isRunning}>
          STOP
        </button>
        <button onClick={() => setSpeed((prev) => prev - 100)}>
          GO FASTER
        </button>
        <span> The time is {isRunning ? "running" : "NOT running"}</span>
      </RightPanel>
    </GameContainer>
  );
}

export default App;