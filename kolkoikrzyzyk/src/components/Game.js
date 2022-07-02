import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";
import Scroes from "./Scores";

const gamePlayersInitState = [];

function gamePlayersReducer(state, action) {
  switch (action.type) {
    case "ADD_NEW_PLAYER_STATS":
      return [
        ...state,
        { player: action.player, score: action.score }
      ];
    case "UPDATE_PLAYERS_STATISTICKS":
      const playerToUpdate = state.find(st => action.player === st.player)

      const updatedPalyer = { player: action.player, score: playerToUpdate.score + 1 }
      const filtredArray = state.filter(st => st.player !== action.player);

      filtredArray.push(updatedPalyer);

      return filtredArray;
    default:
      throw new Error("bad reducer action");
  }
}

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);

  const [scoreArray, scoreArrayDispatch] = React.useReducer(gamePlayersReducer, gamePlayersInitState, init => init);

  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    if (winner || squares[i]) return;

    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const saveScoreClick = () => {
    if (!winner) return;
    const playerExist = scoreArray.find(str => str.player === winner);

    playerExist !== undefined
      ? scoreArrayDispatch({ type: "UPDATE_PLAYERS_STATISTICKS", player: winner })
      : scoreArrayDispatch({ type: "ADD_NEW_PLAYER_STATS", player: winner, score: 1 })
    return;
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>Tic Tac Toe Game</h1>
      <Scroes scoreArray={scoreArray} />
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
        {winner && <button onClick={saveScoreClick}>Save Score</button>}
      </div>
    </>
  );
};

export default Game;
