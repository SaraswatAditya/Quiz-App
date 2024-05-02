import React, { useState, useEffect } from "react";
import "./Result.scss";

const Result = ({ TotalQuestions, result, onTryAgain }) => {
  const [name, setName] = useState("");
  const [highScores, setHighScores] = useState([]);
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    let storedHighScores = [];
    try {
      const data = localStorage.getItem("highScores");
      if (data) {
        storedHighScores = JSON.parse(data);
      }
    } catch (error) {
      console.error("Error parsing high scores from localStorage:", error);
    }
    setHighScores(storedHighScores); // Ensure to set a default if parsing fails
  }, []);

  const handleSave = () => {
    const score = {
      name,
      score: result.score,
    };

    const newHighScores = [...highScores, score].sort(
      (a,b) => b.score - a.score
    );
    setHighScores(newHighScores);
    setShowScores(true);
    localStorage.setItem("highScores", JSON.stringify(newHighScores));
  };

  const handleTryAgain = () => {
    setShowScores(false);
    setHighScores([]);
    onTryAgain();
  };

  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Questions: <span>{TotalQuestions}</span>
      </p>
      <p>
        Total Score: <span>{result.score}</span>
      </p>
      <p>
        Correct Answers: <span>{result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answers: <span>{result.wrongAnswers}</span>
      </p>
      <button onClick={onTryAgain}>Try again</button>
      {!showScores ? (
        <>
          <h3>
            Enter your name below <br /> to save your score!
          </h3>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <br />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((highScores, i) => {
                return (
                  <tr key={`${highScores.scores}${highScores.name}${i}`}>
                    <td>{i + 1}</td>
                    <td>{highScores.name}</td>
                    <td>{highScores.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Result;
