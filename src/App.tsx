import { useState, FC, useEffect, useMemo } from 'react';
import { Game } from './components/game/Game';
import { StartPage } from './components/start-page/StartPage';
import { EndPage } from './components/end-page/EndPage';
import stepsMoney from './stepsMoney.json';
import questions from './questions.json';

type Money = {
  id: number;
  amount: string;
};

const App: FC = () => {
  const [mode, setMode] = useState<string>('startPage');
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [earned, setEarned] = useState<string>('$ 0');
  const onReset = () => {
    setMode('startPage');
    setQuestionNumber(1);
    setEarned('$ 0');
  };

  const questionsList = useMemo(() => JSON.parse(JSON.stringify(questions)), []);
  const moneyPyramid = useMemo(() => JSON.parse(JSON.stringify(stepsMoney)).reverse(), []);
  const isWinner = questionNumber > questionsList.at(-1).id;

  useEffect(() => {
    if (questionNumber > 1) {
      setEarned(moneyPyramid?.find((m: Money) => m.id === questionNumber - 1).amount);
    }
    if (isWinner) {
      setMode('end');
    }
  }, [questionNumber, moneyPyramid, isWinner]);
  return (
    <div className="app">
      {mode == 'startPage' && <StartPage setMode={setMode} />}
      {mode == 'game' && (
        <Game
          questionsList={questionsList}
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          setMode={setMode}
          moneyPyramid={moneyPyramid}
        />
      )}
      {mode == 'end' && <EndPage earned={earned} onReset={onReset} isWinner={isWinner} />}
    </div>
  );
};

export default App;
