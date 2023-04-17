import React from "react";

export default function NameInputForm({
    nameInputValue,
    handleInputChange,
    handleSubmit,
}) {
   return (
    <form onSubmit={handleSubmit} className="new-player-form">
    <h1 className="header">Rock, Scissor, Paper</h1>
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
   );
}