import { useEffect, useState, FC } from 'react';
import './game.css';

interface Answers {
  letter: string;
  text: string;
  correct: boolean;
}

interface Money {
  id: number;
  amount: string;
}

interface Data {
  id: number;
  question: string;
  answers: Answers[];
}

interface GameProps {
  data: Data[];
  questionNumber: number;
  setQuestionNumber: (number: any) => void;
  setMode(title: string): void;
  moneyPyramid: Money[];
}

export const Game: FC<GameProps> = ({
  data,
  questionNumber,
  setQuestionNumber,
  setMode,
  moneyPyramid
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState<string>('answer');
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration: number, callback: any) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a: any) => {
    setSelectedAnswer(a);
    setClassName('active');
    delay(1000, () => {
      setClassName(a.correct ? 'correct' : 'wrong');
    });
    delay(2000, () => {
      if (a.correct) {
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
          {question?.answers.map((a: any) => (
            <div
              className={`${
                selectedAnswer === a ? className : ''
              } game-question__answer game-question__answer--border`}
              onClick={() => !selectedAnswer && handleClick(a)}
            >
              <hr className="line" />
              <div className="game-question__answer__text">
                <span>{a.letter}</span>
                {a.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <nav className={`${openMenu ? 'open' : ''} game-money`}>
        <button className="btn-close" onClick={() => setOpenMenu(false)}></button>
        <ul className="game-money__list">
          {moneyPyramid.map((m) => (
            <li
              className={`${moneyClassName(
                m.id
              )} game-question__answer game-question__answer--money game-question__answer--border`}
            >
              <hr className="line" />
              <span className="game-money__amount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
