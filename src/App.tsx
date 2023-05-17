import React, { useState } from "react";
import "./App.css";
import Game from "./components/Game/Game";
import Score from "./components/Score/Score";

const App = () => {
  let [score, setScore] = useState('');
  
  const getScore = (data: string) => {
    setScore(data);
  }
  
  return (
    <div className="App">
      <Score data={score}/>
      <Game getScore={getScore}/>
    </div>
  );
}

export default App;
