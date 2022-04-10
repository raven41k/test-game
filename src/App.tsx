import { useState, FC, useEffect, useMemo } from 'react';
import { Game } from './components/game/Game';
import { StartPage } from './components/start-page/StartPage';
import { EndPage } from './components/end-page/EndPage';
import stepsMoney from './stepsMoney.json';
import questions from './questions.json';

const App: FC = () => {
  const [mode, setMode] = useState<string>('startPage');
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [earned, setEarned] = useState<string>('$ 0');
  const onReset = () => {
    setMode('startPage');
    setQuestionNumber(1);
    setEarned('$ 0');
  };

  const data = JSON.parse(JSON.stringify(questions));
  const isWinner = questionNumber > data.at(-1).id;
  const moneyPyramid = useMemo(() => JSON.parse(JSON.stringify(stepsMoney)).reverse(), []);

  useEffect(() => {
    if (questionNumber > 1) {
      setEarned(moneyPyramid?.find((m: any) => m.id === questionNumber - 1).amount);
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
          data={data}
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
