export default function App() {
  return (
    <>
    <h1 className="header">Rock, Scissor, Paper</h1>
      <form className="new-player-form">
        <div>
          <label htmlFor="nameInput">Enter name:</label>
          <input type="text" id="nameInput"/>
        </div>
        <button className="btn"></button>
      </form>
      <h1>Highscore</h1>
      <div></div>
    </>
  )
}