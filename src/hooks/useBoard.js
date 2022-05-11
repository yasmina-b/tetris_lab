import { useState, useEffect, useRef, useCallback } from "react";
import { randomTetromino } from "../tetrominos";
import { getEmptyBoard, DIRECTION, getOppositeDirection } from "../utils/utils";

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard());

  let keyPressed = false;

  const player = useRef({
    currentPos: { row: 0, column: 5 },
    tetromino: randomTetromino(),
  });

  let oldTetro = player.current.tetromino.shape;

  const rotateTetromino = () => {
    let newTetro = player.current.tetromino.shape[0].map((_, colIndex) =>
      player.current.tetromino.shape.map((row) => row[colIndex])
    );

    player.current.tetromino.shape = newTetro;
  };

  const updatePosition = useCallback((direction = DIRECTION.down, rotate = false) => {
    let verticalAdjustment = 0;
    let horizontalAdjustment = 0;

    switch(direction) {
      case DIRECTION.up:
        verticalAdjustment = -1;
        break;
      case DIRECTION.down:
        verticalAdjustment = 1;
        break;
      case DIRECTION.left:
        horizontalAdjustment = -1;
        break;
      case DIRECTION.right:
        horizontalAdjustment = 1;
        break;
    }

    if(rotate) {
      rotateTetromino();
    }

    player.current = {
      currentPos: {
        row: player.current.currentPos.row + verticalAdjustment,
        column: player.current.currentPos.column + horizontalAdjustment,
      },
      tetromino: player.current.tetromino,
    };
  }, []);

  const updateBoard = (direction = DIRECTION.down, rotate = false) => {
    // 1. sterg piesa (pozitia veche)
    player.current.tetromino.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        const row = player.current.currentPos.row + rowIdx;
        const column = player.current.currentPos.column + colIdx;
        if (val === true) {
          board[row][column] = null;
        }
      });
    });

    // 2. muta piesa mai jos

    updatePosition(direction,rotate);

    // 3. verifica daca sunt coliziuni

    let isCollided = false;
    player.current.tetromino.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        if (val === true) {
          const row = player.current.currentPos.row + rowIdx;
          const column = player.current.currentPos.column + colIdx;
          if (
            row > 19 ||
            row < 0 ||
            column < 0 ||
            column > 11 ||
            board[row][column] != null
          ) {
            isCollided = true;
          }
        }
      });
    });

    // 4. daca sunt coliziuni intoarce piesa inapoi + log
    if (isCollided && rotate) {
      player.current.tetromino.shape = oldTetro;
    } else if (isCollided) {
      console.log("Collission!!!");
      updatePosition(getOppositeDirection(direction));
    }

    // 5. desenarea piesei
    if (keyPressed === false) {
      player.current.tetromino.shape.forEach((row, rowIdx) => {
        row.forEach((val, colIdx) => {
          const row = player.current.currentPos.row + rowIdx;
          const column = player.current.currentPos.column + colIdx;

          if (val === true) {
            board[row][column] = player.current.tetromino.color;
          }
        });
      });
    } else {
      keyPressed = false;
    }

    if (isCollided && direction === DIRECTION.down) {
      player.current = {
        currentPos: { row: 0, column: 5 },
        tetromino: randomTetromino(),
      };
      keyPressed = false;
    }
    setBoard([...board]);
  };


  return [updateBoard, board];
};