import { useState, useEffect, useRef, useCallback } from "react";
import { randomTetromino } from "../tetrominos";
import { getEmptyBoard } from "../utils/utils";

const DIRECTION = {
    up: 'up',
    down: 'down'
}

export const useBoard = () => {
    const [board, setBoard] = useState(getEmptyBoard());

    const player = useRef( {
        currentPos : { row: 0, column: 5 },
        tetromino : randomTetromino()
    });

useEffect(() => {
   //updateBoard(board);
},[])

const updatePosition = useCallback ((direction = DIRECTION.down) => {
    let verticalAdjustment = 0;
    if(direction === DIRECTION.down) {
        verticalAdjustment = 1;
    } else if (direction === DIRECTION.up) {
        verticalAdjustment = -1;
    }
    player.current = {
        currentPos: { 
            row: player.current.currentPos.row + verticalAdjustment,
            column: player.current.currentPos.column 
        },
            tetromino: player.current.tetromino
    }

},[]);

const updateBoard = () => {
    // 1. sterg piesa (pozitia veche)
    player.current.tetromino.shape.forEach((row,rowIdx) => {
        row.forEach((val, colIdx) => {
            const row = player.current.currentPos.row + rowIdx
            const column = player.current.currentPos.column + colIdx
            if(val === true){
                board[row][column] = null;
            }
           
        });
    });
    // 2. muta piesa mai jos

    updatePosition(DIRECTION.down);

    // 3. verifica daca sunt coliziuni

    let isCollided = false;
    player.current.tetromino.shape.forEach((row,rowIdx) => {
        row.forEach((val, colIdx) => {
            if(val === true) {
                const row = player.current.currentPos.row + rowIdx
                const column = player.current.currentPos.column + colIdx
                if(row > 19 || row < 0 || column < 0 || column > 11 || board[row][column] != null) {
                    isCollided = true;
                }
            }
        });
    });

    // 4. daca sunt coliziuni intoarce piesa inapoi + log
    if(isCollided) {
        console.log("Collision!!");
        updatePosition(DIRECTION.up);
    }

    // 5. desenarea piesei
    player.current.tetromino.shape.forEach((row, rowIdx) => {
        row.forEach((val, colIdx) => {
            const row = player.current.currentPos.row + rowIdx
            const column = player.current.currentPos.column + colIdx

            if(val === true) {
                board[row][column] = player.current.tetromino.color;
            }
        });
    });

    if(isCollided) {
        player.current = {
            currentPos : {row: 0, column: 5},
            tetromino : randomTetromino(),
        }
    }
    setBoard([...board]);
}

    return [updateBoard, board];
}

