import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionContext } from "../../context/question.context";
import "./home.css";
const Home = () => {
  const navigate = useNavigate();
  const [questionAmount, setQuestionAmount] = useState(10);
  const { setAmount, questions } = useContext(questionContext);

  const handleClick = () => {
    setAmount(questionAmount);
    navigate("/start");
  };
  return (
    questions.length > 1 && (
      <>
        <nav>FinalExam</nav>
        <form className="options-container">
          <label>Number of Questions</label>
          <select
            name="amount"
            id="amount"
            onChange={(e) => {
              setQuestionAmount(e.target.value);
            }}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
          <label>Select category:</label>
          <select name="" id="">
            <option value="">English</option>
          </select>
          <button type="button" onClick={handleClick} className="btn start-btn">
            START
          </button>
          <button className="test-btn btn">TEST</button>
        </form>
      </>
    )
  );
};

export default Home;
