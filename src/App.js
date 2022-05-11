import React, { useCallback, useState } from "react";
import "./App.css";
import { GameContainer } from "./components/GameContainer";
import { useGameTime } from "./hooks/useGameTime";
import { RightPanel } from "./components/RightPanel";
import { TileBoard } from "./components/TileBoard";
import { useBoard } from "./hooks/useBoard";
import { DIRECTION } from "./utils/utils";

function App() {
  const [speed, setSpeed] = useState(1000);
  const [updateBoard, board] = useBoard();

  const onTick = useCallback(() => {
    console.log("tic tic");
    updateBoard();
  },[]);
  
  const { isRunning, startTime, stopTime } = useGameTime({ onTick, speed});

  const move = ({ keyCode }) => {
    console.log('The tetromino is moving');
    stopTime();
    if (keyCode === 37) {
      updateBoard(DIRECTION.left);
    } else if (keyCode === 38) {
      updateBoard(DIRECTION.down,true);
    } else if (keyCode === 40 ){
      setSpeed((prev) => setSpeed(prev-100));
    } else if (keyCode === 39) {
      updateBoard(DIRECTION.right);
    } 
    startTime();
  };

  return (
    <GameContainer keyDown ={move}>
      <TileBoard board={board} />
      <RightPanel>
        <h2>MY TETRIS GAME</h2>
        <button  className="start-button" onClick={startTime} disabled={isRunning}>
          START
        </button>
        <button className="stop-button" onClick={stopTime} disabled={!isRunning}>
          STOP
        </button>
        <button className="fast-button" onClick={() => setSpeed((prev) => prev - 100)}>
          GO FASTER
        </button>
        <h5> The time is {isRunning ? "running" : "NOT running"}</h5>
      </RightPanel>
    </GameContainer>
  );
}

export default App;