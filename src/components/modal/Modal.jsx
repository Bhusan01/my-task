import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./modal.css";
import { questionContext } from "../../context/question.context";
const Modal = ({ setIsDisabled, setIsModalOpen }) => {
  const {
    setAmount,
    setCurrentQuestion,
    setInCorrectAnswers,
    setCorrectAnswers,
    correctAnswers,
    amount,
  } = useContext(questionContext);
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
    setAmount(10);
    setCurrentQuestion(0);
    setInCorrectAnswers([]);
    setCorrectAnswers([]);
  };
  const handleOk = () => {
    setIsDisabled(true);
    setIsModalOpen();
  };
  return (
    <div className="modal">
      <div className="modal-container">
        <h2>your results</h2>
        <div className="result">
          <div className="first-col">
            {correctAnswers.length}/{amount}
          </div>
          or
          <div className="third-col">
            {(Number(correctAnswers.length) / amount) * 100}%
          </div>
        </div>
        <div className="modal-bottom">
          <button className="blue-button" onClick={handleOk}>
            OK
          </button>
          <button className="red-button" onClick={handleHome}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
