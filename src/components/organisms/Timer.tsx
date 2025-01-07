import { memo, useRef, useState } from 'react';
import { SRow } from '../../styles/SRow';

type Props = {
  istimer: boolean;
  isClear: boolean;
};

let minute: number = 0;
let second: number = 0;
let millisecond: number = 0;
export const Timer = memo((props: Props) => {
  const { istimer, isClear } = props;

  // タイマー用
  const [time, setTime] = useState<number>(0);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalId.current) {
      return;
    }
    intervalId.current = setInterval(() => setTime((n) => n + 1), 10);
    setTime(0);
  };

  const stopTimer = () => {
    if (!intervalId.current) {
      return;
    }
    clearInterval(intervalId.current);
    intervalId.current = null;
  };
  istimer ? startTimer() : stopTimer();

  millisecond = time % 100;
  second = ((time - millisecond) % 6000) / 100;
  minute = (time - (time % 6000)) / 6000;

  return (
    <SRow>
      <p>time:</p>
      <p>{minute}m</p>
      <p>{second}s</p>
      <p>{millisecond}</p>
      {isClear ? <p>Game Clear!</p> : <></>}
    </SRow>
  );
});
