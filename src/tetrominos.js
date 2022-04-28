/*export const i = [[true], [true], [true], [true]];

export const j = [
  [false, true],
  [false, true],
  [true, true],
];

export const l = [
  [true, false],
  [true, false],
  [true, true], 
];
export const o = [
  [true, true],
  [true, true],
];

export const s = [
  [false, true, true],
  [true, true, false],
];

export const z = [
  [true, true, false],
  [false, true, true],
];

export const t = [
  [true, true, true],
  [false, true, false],
];*/

export const TETROMINOS = {
  L: {
    shape: [
      [true, false],
      [true, false],
      [true, true],
    ],
    color: "orange"
  },
  O: {
    shape: [
      [true, true],
      [true, true],
    ],
    color: "yellow"
  },
  I: {
    shape: [
      [true],
      [true],
      [true],
      [true],
    ],
    color: "blue"
  },
  J: {
    shape: [
      [false, true],
      [false, true],
      [false, true],
      [false, true],
    ],
    color: "pink"
  },
  S: {
    shape : [
      [false, true, true],
      [true, true, false],
    ],
    color: "red"
  },
  T: {
    shape : [
      [true, true, true],
      [false, true, false],
    ],
    color: "purple"

  },
  Z: {
    shape: [
      [true, true, false],
      [false, true, true],
    ],
    color: "green"
  }
};

export const randomTetromino = () => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};