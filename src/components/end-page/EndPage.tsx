import { FC } from 'react';
import './end-page.css';
import ok from '../../img/end.png';

type EndPageProps = {
  earned: string;
  onReset(): void;
  isWinner: boolean;
};

export const EndPage: FC<EndPageProps> = ({ earned, onReset, isWinner }) => (
  <div className="start-page start-page--end">
    <div className="left-block">
      <img src={ok} alt="ok" />
    </div>
    <div className="right-block">
      {isWinner && <div className="right-block__title">Ты молодец!</div>}
      <div className="right-block__total">Total score:</div>
      <div className="right-block__title">{earned} earned</div>
      <button className="right-block__btn" onClick={() => onReset()}>
        Понравилось? Попробуй еще разок
      </button>
    </div>
  </div>
);
