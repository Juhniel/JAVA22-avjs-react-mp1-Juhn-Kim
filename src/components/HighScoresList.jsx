import React from "react";

export default function HighScoresList({ highScores }) {
    return (
      <>
        <h1>Highscore</h1>
        <div id="score-list">
          <ol>
            {highScores.map(([key, userObj]) => (
              <li key={key}>
                {userObj.name} - Score: {userObj.score}
              </li>
            ))}
          </ol>
        </div>
      </>
    );
  }