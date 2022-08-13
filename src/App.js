import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
