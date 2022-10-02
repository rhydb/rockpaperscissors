import { useState } from "react";
import Score from "./components/Score/"
import Pentagon from "./components/Pentagon";
import Rules from "./components/Rules";
import "./App.css";

function App() {
  let oldScore = localStorage.getItem("score")
  if (oldScore === null) {
    oldScore = 0;
    localStorage.setItem("score", 0);
  }
  const [score, setScore] = useState(parseInt(oldScore));

  const incScore = (amount) => {
    console.log({score, amount})
    const newScore = score + amount;
    setScore(newScore);
    // update local storage
    localStorage.setItem("score", newScore);
  }

  return (
    <div className="container">
      <Score score={score} />
      <Pentagon incScore={incScore} />
      <Rules />
    </div>
  );
}

export default App;
