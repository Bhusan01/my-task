import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import { questionContext } from "../../context/question.context";
import "./quiz.css";

const Quiz = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [variants, setVariants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const [clickedButton, setClickedButton] = useState("");

  const {
    amount,
    questions,
    currentQuestion,
    setCorrectAnswers,
    correctAnswers,
    setInCorrectAnswers,
    incorrectAnswers,
    setCurrentQuestion,
  } = useContext(questionContext);

  const handleChange = (e) => {
    console.log(e.target);
    console.log(e.target.value);
    setSelectedValue(e.target.value);
  };

  const handleButtonClick = (e) => {
    setCurrentQuestion(e.target.innerText - 1);
  };

  const handlePrev = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleClick = () => {
    setIsDisabled(true);
    if (selectedValue === questions[currentQuestion].correct_answer) {
      setCorrectAnswers([...correctAnswers, ...[currentQuestion]]);
    } else {
      setInCorrectAnswers([...incorrectAnswers, ...[currentQuestion]]);
    }
  };

  const handleNextBtn = () => {
    setCurrentQuestion(currentQuestion < amount - 1 && currentQuestion + 1);
    setSelectedValue("");
    setDisableSubmitButton(true);
    setIsDisabled(false);
  };

  const handleInputClick = (e) => {
    const parent = e.target.closest(".middle");
    const children = Array.from(parent.children);
    children.forEach((child) => child.classList.remove("click"));
    e.target.closest(".variant").classList.add("click");
    console.log(e.target.closest(".variant").name);
    setClickedButton(e.target.closest(".variant").name);
  };

  useEffect(() => {
    questions &&
      setVariants(
        [
          ...[questions[currentQuestion]?.correct_answer],
          ...questions[currentQuestion]?.incorrect_answers,
        ].sort()
      );
  }, [questions, currentQuestion]);

  useEffect(() => {
    if (selectedValue.length > 1) {
      setDisableSubmitButton(false);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (currentQuestion === 0) {
      setPrevDisabled(true);
    } else if (currentQuestion > 0) {
      setPrevDisabled(false);
    }
    if (currentQuestion === amount - 1) {
      setNextBtnDisabled(true);
    } else {
      setNextBtnDisabled(false);
    }

    if (
      correctAnswers.includes(currentQuestion) ||
      incorrectAnswers.includes(currentQuestion)
    ) {
      setIsDisabled(true);
    } else if (
      !correctAnswers.includes(currentQuestion) ||
      !incorrectAnswers.includes(currentQuestion)
    ) {
      setIsDisabled(false);
    }
  }, [currentQuestion]);

  return (
    <div>
      <header>
        <div className="left">FinalExam</div>
        <div className="center">
          {currentQuestion + 1}/{amount}
        </div>
        <button className="right buton" onClick={() => setIsModalOpen(true)}>
          Finish
        </button>
      </header>
      {questions && (
        <main>
          <div className="order-container">
            {questions.map((question, index) => (
              <button
                onClick={handleButtonClick}
                key={index + 1}
                className={`order-item ${
                  index === currentQuestion && "current"
                } ${correctAnswers.includes(index) && "correct_btn"}  ${
                  incorrectAnswers.includes(index) && "incorrect_btn"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="question-card">
            <div className="top">{questions[currentQuestion]?.question}</div>
            <form className="middle" onChange={handleChange}>
              {variants.map((variant, index) => (
                <div
                  name={variant}
                  key={variant}
                  onClick={handleInputClick}
                  className={`variant ${
                    variant === questions[currentQuestion].correct_answer
                      ? isDisabled || isQuizFinished
                        ? "correct"
                        : ""
                      : isDisabled || isQuizFinished
                      ? "incorrect"
                      : ""
                  } `}
                >
                  <input
                    type="radio"
                    id={variant}
                    value={variant}
                    name="question"
                    disabled={isDisabled}
                  />
                  <label htmlFor={variant}>{variant}</label>
                </div>
              ))}
            </form>
            <div className="bottom">
              <button
                className={`prev ${prevDisabled && "disabled"}`}
                disabled={prevDisabled}
                onClick={handlePrev}
              >
                previous
              </button>
              <button
                className={`middle-btn ${
                  disableSubmitButton === false && "clickable"
                }`}
                onClick={handleClick}
                disabled={disableSubmitButton}
              >
                submit
              </button>
              <button
                className={`next ${nextBtnDisabled && "disabled"}`}
                onClick={handleNextBtn}
                disabled={nextBtnDisabled}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      )}

      {isModalOpen && (
        <Modal
          setIsDisabled={setIsQuizFinished}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Quiz;
