import React from "react";

export default function GameControls({ handleRPSChoice }) {
  return (
    <div className="RPSContainer">
      <button className="RPSButtons" value="rock" onClick={handleRPSChoice}>
        Rock
      </button>
      <button className="RPSButtons" value="paper" onClick={handleRPSChoice}>
        Paper
      </button>
      <button className="RPSButtons" value="scissors" onClick={handleRPSChoice}>
        Scissor
      </button>
    </div>
  );
}
