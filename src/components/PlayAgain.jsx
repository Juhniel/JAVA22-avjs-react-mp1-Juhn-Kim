import React from "react";
import "../PlayAgain.css";

export default function PlayAgain(props) {
    function handlePlayAgain(e) {
      e.preventDefault();
      props.onPlayAgain();
    }
  
    return (
      <div className="playAgainContainer">
        <h1>Game Over!</h1>
        <p>Do you want to play again?</p>
        <button className="playAgainButton" onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    );
  }