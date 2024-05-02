import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import WindowStatusCheck from "./components/Window/WindowStatusCheck";
import FullScreenPrompt from "./components/Window/FullScreenPrompt";

function App() {
  // State to track whether the full-screen prompt has been clicked

  const [isFullScreenClicked, setIsFullScreenClicked] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch(
        "https://66339dddf7d50bbd9b4a12f8.mockapi.io/quizQuestions"
      );
      const questionsResponse = await response.json();
      console.log(questionsResponse);
      setQuestions(questionsResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      {/* Pass a callback to FullScreenPrompt to update the state when clicked */}
      <FullScreenPrompt
        onFullScreenClick={() => setIsFullScreenClicked(true)}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="home-div">
              <h1>Welcome to Quiz App</h1>
              {!isFullScreenClicked && (
                <>
                  <h3>General Instructions:</h3>
                  <ul className="ul-div">
                    <li>Stay in Full-Screen Mode</li>
                    <li>Avoid Minimizing or Switching Tabs</li>
                    <li>Keep the Quiz Window Active</li>
                    <li>
                      Frequent minimization or tab-switching may lead to
                      disqualification or other penalties.
                    </li>
                  </ul>
                </>
              )}
              {/* Display the "Start the Quiz" link only if the full-screen prompt was clicked */}
              {isFullScreenClicked && (
                <Link className="link-div" to="/quiz">
                  Start the Quiz
                </Link>
              )}
            </div>
          }
        />
        <Route
          exact
          path="/quiz"
          element={
            <>
              <WindowStatusCheck />
              <Quiz questions={questions} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
