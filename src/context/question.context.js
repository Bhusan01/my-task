import { createContext, useEffect, useState } from "react";

export const questionContext = createContext({
  setQuestions: () => {},
  questions: [],
  currentQuestion: {},
  amount: 10,
  setAmount: () => {},
  correctAnswers: 0,
  setCorrectAnswers: () => {},
  setInCorrectAnswers: () => {},
  incorrectAnswers: 0,
  setCurrentQuestion: () => {},
});

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [amount, setAmount] = useState(10);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setInCorrectAnswers] = useState([]);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  const value = {
    questions,
    setQuestions,
    currentQuestion,
    amount,
    setAmount,
    setCorrectAnswers,
    correctAnswers,
    setInCorrectAnswers,
    incorrectAnswers,
    setCurrentQuestion,
  };
  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await fetch("https://opentdb.com/api.php?amount=50");

      const data = await res.json();
      const finalResult = data.results.filter(
        (result) => result.type === "multiple"
      );
      setQuestions(finalResult.slice(0, amount));
    };
    fetchQuestion();
  }, [amount]);

  return (
    <questionContext.Provider value={value}>
      {children}
    </questionContext.Provider>
  );
};
