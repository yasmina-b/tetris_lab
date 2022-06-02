import React, { useCallback, useContext, useState } from "react";
import "./App.css";
import { GameContainer } from "./components/GameContainer";
import { useGameTime } from "./hooks/useGameTime";
import { RightPanel } from "./components/RightPanel";
import { TileBoard } from "./components/TileBoard";
import { useBoard } from "./hooks/useBoard";
import { DIRECTION } from "./utils/utils";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CssBaseline, Switch, AppBar, Rating, Box, Typography} from "@mui/material";
import {ThemeContext} from "./components/CustomThemeProvider"

function App() {
  const {darkMode,setDarkMode} = useContext(ThemeContext);
  const gigi = useContext(ThemeContext);
  console.log("hello",gigi);
  const [speed, setSpeed] = useState(1000);
  const [updateBoard, board, drawPlayer] = useBoard();

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
  const [value, setValue] = useState(0);

  function onStartHandler(){
    drawPlayer();
    startTime();
  }

  return (
      <CssBaseline> 
        <GameContainer keyDown ={move}>
          <Switch sx={{position: "absolute" ,top:"20px" ,right: "20px"}} checked={darkMode} onChange={() => setDarkMode(!darkMode) }></Switch>
            <TileBoard board={board} />
              <RightPanel>
                <h2>LET'S PLAY TETRIS!</h2>
                <Stack spacing={2}>
                <Button variant="contained" color="secondary" size="medium" onClick={onStartHandler} disabled={isRunning} >START GAME</Button>
                <Button variant="contained" color="error" size="medium" onClick={stopTime} disabled={!isRunning}>STOP GAME</Button>
                <Button variant="contained" color="primary" size="medium" onClick={() => setSpeed((prev) => prev - 100)}>GO FASTER</Button>
                </Stack>
                <h5> The time is {isRunning ? "running" : "NOT running"}</h5>
                <Stack spacing={1}>
                    <h4>HOW TO PLAY?</h4>
                    <h6>UP ARROW: rotate</h6>
                    <h6>DOWN ARROW: go faster</h6>
                    <h6>RIGHT ARROW: go right</h6>
                    <h6>LEFT ARROW: go left</h6>
                </Stack>
                <Box sx={{'& > legend': { mt: 2 },}}>
                  <h4>RATE ME?</h4>
                  <Rating name="simple-controlled" value={value} onChange={(event, newValue) => {setValue(newValue);}}/>
                </Box>
              </RightPanel>
        </GameContainer>
      </CssBaseline>
  );
}

export default App;