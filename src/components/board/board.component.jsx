import { useEffect, useState } from 'react';
import { BOARD_SIZE } from '../../utils/constants';
import { randomIntFromInterval, useInterval } from '../../utils/utils';
import './board.component.styles.scss';

const getStartingSnakeValue = board => {
  const xSize = board.length;
  const ySize = board[0].length;
  const startingX = Math.round(xSize / 3);
  const startingY = Math.round(ySize / 3);
  const startingCell = board[startingX][startingY];
  return {
    x: startingX,
    y: startingY,
    cell: startingCell,
  };
};

const Board = () => {
  const [board] = useState(createBoard(BOARD_SIZE));
  const [snakeBody, setSnakeBody] = useState([getStartingSnakeValue(board)]);
  const [snakeCells, setSnakeCells] = useState(
    new Set(snakeBody.map(({ cell }) => cell))
  );
  const [direction, setDirection] = useState('right');
  const [clickDirection, setClickDirection] = useState('right');
  const [snakeHead, setSnakeHead] = useState(snakeBody[0]);
  const [foodCell, setFoodCell] = useState(snakeBody[0].cell + 5);
  const [score, setScore] = useState(0);
  const [sessionHighScore, setSessionHighScore] = useState(score);

  useEffect(() => {
    window.addEventListener('keydown', e => handleKeydown(e));
  }, []);

  const handleKeydown = e => {
    console.log(e);
    if (e.key === 'ArrowRight') setClickDirection('right');
    if (e.key === 'ArrowLeft') setClickDirection('left');
    if (e.key === 'ArrowUp') setClickDirection('up');
    if (e.key === 'ArrowDown') setClickDirection('down');
    return;
  };

  const getNewBody = snakeBody => {
    const newBody = [];
    for (let i = snakeBody.length - 2; i >= 0; i--) {
      newBody[i] = snakeBody[i];
    }
    return newBody;
  };

  const resetGame = () => {
    const initialBody = [getStartingSnakeValue(board)];
    setSnakeBody(initialBody);
    setSnakeCells(new Set(initialBody.map(({ cell }) => cell)));
    setDirection('right');
    setClickDirection('right');
    setSnakeHead(initialBody[0]);
    setFoodCell(initialBody[0].cell + 5);
    if (score > sessionHighScore) setSessionHighScore(score);
    setScore(0);
  };

  const moveSnake = () => {
    let directionToSet = validClickDirection(direction, clickDirection);
    setDirection(directionToSet);

    const currentHeadCoords = {
      x: snakeHead.x,
      y: snakeHead.y,
      cell: snakeHead.cell,
    };

    const nextHeadCoords = getCoordsGivenDirection(
      directionToSet,
      currentHeadCoords
    );

    if (isGameOver(nextHeadCoords, snakeCells)) {
      resetGame();
      return;
    }

    setSnakeHead(nextHeadCoords);

    let newSnakeBody = [{ ...nextHeadCoords }];
    newSnakeBody = [...newSnakeBody, ...snakeBody];

    newSnakeBody = getNewBody([...newSnakeBody]);

    const newSnakeCells = new Set();
    newSnakeBody.forEach(({ cell }) => newSnakeCells.add(cell));

    const foodConsumed = foodCell === nextHeadCoords.cell;

    if (foodConsumed) {
      newSnakeCells.add(snakeBody.at(-1).cell);
      newSnakeBody = [{ ...nextHeadCoords }, ...snakeBody];
      setFoodCell(
        randomIntFromInterval(1, BOARD_SIZE ** 2, snakeCells, foodCell)
      );
      setScore(score + 1);
    }

    setSnakeCells(newSnakeCells);
    setSnakeBody(newSnakeBody);
  };

  useInterval(() => {
    moveSnake();
  }, 100);

  return (
    <div className="container">
      <div className="score-information">
        <h2 className="score">Score: {score}</h2>
        <h3 className="session-score">
          Session High Score: {sessionHighScore}
        </h3>
      </div>
      <div className="board">
        {board.map((row, i) => {
          return (
            <div className="row" key={i}>
              {row.map((cell, i) => {
                return (
                  <div
                    key={i}
                    className={`cell ${
                      snakeCells.has(cell) ? 'snake-cell' : ''
                    } ${foodCell === cell ? 'food-cell' : ''}`}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const isGameOver = ({ x, y, cell }, snakeCells) => {
  if (x === BOARD_SIZE || y === BOARD_SIZE || x < 0 || y < 0) return true;
  if (snakeCells.has(cell)) return true;
  return false;
};

const validClickDirection = (direction, clickDirection) => {
  if (direction === 'right' && clickDirection === 'left') {
    return direction;
  }
  if (direction === 'left' && clickDirection === 'right') {
    return direction;
  }
  if (direction === 'up' && clickDirection === 'down') {
    return direction;
  }
  if (direction === 'down' && clickDirection === 'up') {
    return direction;
  }
  return clickDirection;
};

const getCoordsGivenDirection = (direction, snakeHead) => {
  if (direction === 'right') {
    return {
      ...snakeHead,
      x: snakeHead.x + 1,
      cell: snakeHead.cell + 1,
    };
  }

  if (direction === 'left') {
    return {
      ...snakeHead,
      x: snakeHead.x - 1,
      cell: snakeHead.cell - 1,
    };
  }

  if (direction === 'down') {
    return {
      ...snakeHead,
      y: snakeHead.y + 1,
      cell: snakeHead.cell + BOARD_SIZE,
    };
  }

  if (direction === 'up') {
    return {
      ...snakeHead,
      y: snakeHead.y - 1,
      cell: snakeHead.cell - BOARD_SIZE,
    };
  }
};

const createBoard = BOARD_SIZE => {
  const board = [];
  let count = 1;
  for (let i = 0; i < BOARD_SIZE; i++) {
    const rowA = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      rowA.push(count);
      count++;
    }
    board.push(rowA);
  }
  return board;
};

export default Board;
