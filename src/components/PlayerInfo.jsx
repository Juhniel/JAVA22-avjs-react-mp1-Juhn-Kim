import React from "react";

export default function PlayerInfo({
  submittedName,
  playerOption,
  computerOption,
  gameWinner,
  playerScore,
  computerScore,
}) {
  return (
    <>
      {submittedName && <p>Welcome {submittedName}!</p>}
      {playerOption && (
        <p>
          {submittedName ? submittedName : "Player"} - chose: {playerOption}
        </p>
      )}
      {computerOption && <p>Computer chose: {computerOption}</p>}
      {gameWinner && <p>Winner of the game is: {gameWinner}</p>}
      {gameWinner && (
        <p>
          {playerScore} - {computerScore}
        </p>
      )}
    </>
  );
}
