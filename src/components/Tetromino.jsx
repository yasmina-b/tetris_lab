import React, { Fragment } from "react";
import { i, j, l, o, s, z, t } from "../tetrominos";

function Tetromino() {
  const squares = [];

  for (let i = 0; i < t.length; i++) {
    for (let j = 0; j < t[i].length; j++) {
      if (t[i][j] === true) {
        squares.push({ row: i + 1, col: j + 1 });
      }
    }
  }
  console.log(squares);
  return (
    <>
      {squares.map(({ row, col }) => {
        return (
          <div
            style={{
              gridRowStart: row,
              gridRowEnd: row + 1,
              gridColumnStart: col,
              gridColumnEnd: col + 1,
              backgroundColor: "pink",
            }}
          ></div>
        );
      })}
    </>
  );
}

export default Tetromino;