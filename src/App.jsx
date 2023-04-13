import React, { useState, useEffect } from "react";


export default function App() {
  const [nameInputValue, setNameInputValue] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  
  const choices = ["rock", "paper", "scissors"];

  function handleInputChange(e) {
    setNameInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedName(nameInputValue);
    console.log(nameInputValue); // Logging the name
  }

  function handleRPSChoice(e) {
    gameResult(e.target.value, handleComputerChoice());
  }

  function handleComputerChoice() {
    let computerChoice;
    const computerChoiceNumber = Math.floor(Math.random() * 3);
    computerChoice = choices[computerChoiceNumber];
    return computerChoice;
  }

  function gameResult(playerChoice, computerChoice) {
    console.log(playerChoice);
    console.log(computerChoice);

    if (playerChoice === computerChoice) {
      console.log("Tie!");
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "scissors" && computerChoice === "paper") ||
      (playerChoice === "paper" && computerChoice === "rock")
    ) {
      console.log("Player wins!");
    } else {
      console.log("Computer wins!");
    }
  }

  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    async function getHighscore() {
      const url =
        'https://highscore-react-default-rtdb.europe-west1.firebasedatabase.app/highscores.json';
      const response = await fetch(url);
      const data = await response.json();
      const highScore = Object.entries(data);

      highScore.sort((a, b) => b[1].score - a[1].score);
      setHighScores(highScore);
    }

    getHighscore();
  }, []);

  return (
    <>
      <h1 className="header">Rock, Scissor, Paper</h1>
      <form onSubmit={handleSubmit} className="new-player-form">
        <div>
          <label htmlFor="nameInput">Enter name:</label>
          <input
            type="text"
            id="nameInput"
            value={nameInputValue}
            onChange={handleInputChange}
          />
        </div>
        <button className="nameButton">Submit</button>
      </form>

      {submittedName && <p>Player: {submittedName}</p>}

      <div className="RPSContainer">
        <button className="RPSButtons" value="rock" onClick={handleRPSChoice}>
          Rock
        </button>
        <button className="RPSButtons" value="paper" onClick={handleRPSChoice}>
          Paper
        </button>
        <button
          className="RPSButtons"
          value="scissors"
          onClick={handleRPSChoice}
        >
          Scissor
        </button>
      </div>

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


