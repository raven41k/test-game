import { FC } from 'react';
import ok from '../../img/ok.png';
import './start-page.css';

type StartPageProps = {
  setMode(title: string): void;
};

export const StartPage: FC<StartPageProps> = ({ setMode }) => (
  <div className="start-page">
    <div className="left-block">
      <img src={ok} alt="ok" />
    </div>
    <div className="right-block">
      <h2 className="right-block__title">Опросник деливери</h2>
      <button className="right-block__btn" onClick={() => setMode('game')}>
        Start
      </button>
    </div>
  </div>
);
