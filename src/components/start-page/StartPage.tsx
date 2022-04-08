import { FC } from 'react';
import ok from '../../img/ok.png';
import './start-page.css';

export const StartPage: FC = () => (
  <div className="start-page">
    <div className="left-block">
      <img src={ok} alt="ok" />
    </div>
    <div className="right-block">
      <h2 className="right-block__title">Who wants to be a millionaire?</h2>
      <button className="right-block__btn">Start</button>
    </div>
  </div>
);
