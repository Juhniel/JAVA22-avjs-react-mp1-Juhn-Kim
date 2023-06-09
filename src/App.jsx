import React, { useState, useEffect } from "react";
import PlayAgain from "./components/PlayAgain";
import NameInputForm from "./components/NameInputForm";
import PlayerInfo from "./components/PlayerInfo";
import GameControls from "./components/GameControls";
import HighScoresList from "./components/HighScoresList";

export default function App() {
  const [nameInputValue, setNameInputValue] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [computerOption, setComputerOption] = useState("");
  const [playerOption, setPlayerOption] = useState("");
  const [gameWinner, setGameWinner] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const [highScores, setHighScores] = useState([]);
  const [gameOverStatus, setGameOverStatus] = useState(false);

  const choices = ["rock", "paper", "scissors"];

  useEffect(() => {
    if (computerScore === 1) {
      gameOver(playerScore, submittedName);
    }
  }, [computerScore]);

  function handleInputChange(e) {
    setNameInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedName(nameInputValue || "Player");
    console.log(nameInputValue, submittedName); // Logging the name
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
    setPlayerOption(playerChoice);
    setComputerOption(computerChoice);
    console.log(playerChoice);
    console.log(computerChoice);

    if (playerChoice === computerChoice) {
      console.log("Tie!");
      setGameWinner("Tie");
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "scissors" && computerChoice === "paper") ||
      (playerChoice === "paper" && computerChoice === "rock")
    ) {
      console.log("Player wins!");
      setPlayerScore(playerScore + 1);
      setGameWinner("Player wins!");
    } else {
      console.log("Computer wins!");
      setComputerScore(computerScore + 1);
      setGameWinner("Computer wins!");
    }
  }

  function handlePlayAgain() {
    setGameOverStatus(false);
    setGameWinner("");
    setPlayerOption("");
    setComputerOption("");
  }

  async function gameOver(playerScore, submittedName) {
    setGameOverStatus(true);
    setPlayerScore(0);
    setComputerScore(0);

    await addHighscore(playerScore, submittedName);
  }

  async function addHighscore(playerScore, submittedName) {
    //   event.preventDefault();
    const url =
      "https://highscore-react-default-rtdb.europe-west1.firebasedatabase.app/highscores.json";
    const response = await fetch(url);
    const data = await response.json();
    const highScore = Object.entries(data);

    // Find the lowest score and its key
    let lowestScore = Infinity;
    let lowestScoreKey = null;

    for (const [key, userObj] of highScore) {
      if (userObj.score < lowestScore) {
        lowestScore = userObj.score;
        lowestScoreKey = key;
      }
    }

    // Replace the lowest score if the new score is higher
    if (playerScore > lowestScore) {
      console.log("The new score is higher than the lowest score");
      await patchFunction(submittedName, playerScore, lowestScoreKey);
      await getHighscore();
    } else {
      console.log("The new score is not high enough to enter the leaderboard");
    }
  }

  async function patchFunction(playerName, playerScore, key) {
    const newURL = `https://highscore-react-default-rtdb.europe-west1.firebasedatabase.app/highscores/${key}.json`;

    const newHighscore = {
      name: playerName,
      score: playerScore,
    };

    const options = {
      method: "PATCH",
      body: JSON.stringify(newHighscore),
      Headers: {
        "Content-type": "application/json",
      },
    };

    const newResponse = await fetch(newURL, options);
    await newResponse.json();
  }

  useEffect(() => {
    getHighscore();
  }, []);

  async function getHighscore() {
    const url =
      "https://highscore-react-default-rtdb.europe-west1.firebasedatabase.app/highscores.json";
    const response = await fetch(url);
    const data = await response.json();
    const highScore = Object.entries(data);

    highScore.sort((a, b) => b[1].score - a[1].score);
    setHighScores(highScore);
  }

  return (
    <>
      <NameInputForm
        nameInputValue={nameInputValue}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <PlayerInfo
        submittedName={submittedName}
        playerOption={playerOption}
        computerOption={computerOption}
        gameWinner={gameWinner}
        playerScore={playerScore}
        computerScore={computerScore}
      />

      <GameControls handleRPSChoice={handleRPSChoice} />
      
      {gameOverStatus && <PlayAgain onPlayAgain={handlePlayAgain} />}

      <HighScoresList highScores={highScores} />
    </>
  );
}
