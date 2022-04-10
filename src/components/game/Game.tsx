import { useEffect, useState, FC, useCallback } from 'react';
import './game.css';

type Answers = {
  letter: string;
  text: string;
  correct: boolean;
};

type Money = {
  id: number;
  amount: string;
};

type QuestionsList = {
  id: number;
  question: string;
  answers: Answers[];
};

type GameProps = {
  questionsList: QuestionsList[];
  questionNumber: number;
  setQuestionNumber: (number: any) => void;
  setMode(title: string): void;
  moneyPyramid: Money[];
};

export const Game: FC<GameProps> = ({
  questionsList,
  questionNumber,
  setQuestionNumber,
  setMode,
  moneyPyramid
}) => {
  const [question, setQuestion] = useState<QuestionsList>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Answers>(null);
  const [className, setClassName] = useState<string>('answer');
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    setQuestion(questionsList[questionNumber - 1]);
  }, [questionsList, questionNumber]);

  const delay = (duration: number, callback: any) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (answer: Answers) => {
    setSelectedAnswer(answer);
    setClassName('active');
    delay(1000, () => {
      setClassName(answer.correct ? 'correct' : 'wrong');
    });
    delay(2000, () => {
      if (answer.correct) {
        delay(1000, () => {
          setQuestionNumber((prev: number) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        delay(500, () => {
          setMode('end');
        });
      }
    });
  };
  const moneyClassName = (id: number) => {
    if (questionNumber == id) {
      return 'active';
    } else if (questionNumber > id) {
      return 'old';
    } else {
      return '';
    }
  };
  return (
    <div className="game">
      <button className="btn-open" onClick={() => setOpenMenu(true)}></button>
      <div className="game-question">
        <div className="game-question__title">{question?.question}</div>
        <div className="game-question__answers">
          {question?.answers.map((answer: Answers, id: number) => (
            <div
              key={id}
              className={`${
                selectedAnswer === answer ? className : ''
              } game-question__answer game-question__answer--border`}
              onClick={() => !selectedAnswer && handleClick(answer)}
            >
              <hr className="line" />
              <div className="game-question__answer__text">
                <span>{answer.letter}</span>
                {answer.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <nav className={`${openMenu ? 'open' : ''} game-money`}>
        <button className="btn-close" onClick={() => setOpenMenu(false)}></button>
        <ul className="game-money__list">
          {moneyPyramid.map((money: Money) => (
            <li
              key={money.id}
              className={`${moneyClassName(
                money.id
              )} game-question__answer game-question__answer--money game-question__answer--border`}
            >
              <hr className="line" />
              <span className="game-money__amount">{money.amount}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
