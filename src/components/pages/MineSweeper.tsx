import { FC, memo, useEffect, useRef, useState } from 'react';
import { Game } from '../../class/Game';
import { MineSweeperField } from '../organisms/MineSweeperField';
import { Cell } from '../../class/Cell';
import { SRow } from '../../styles/SRow';
import { Timer } from '../organisms/Timer';

let game = new Game(9, 9, 10);
let isFirstClick: boolean = true;

export const MineSweeper: FC = memo(() => {
  const [newfield, setNewField] = useState<Array<Array<Cell>>>(
    game.field.field
  );
  const [isClear, setIsClear] = useState<boolean>(false);

  // タイマー用
  const [istimer, isSetTimer] = useState<boolean>(false);

  // 右クリックのメニュー非表示
  useEffect(() => {
    document.body.oncontextmenu = function () {
      return false;
    };
  }, []);

  const setField = (): void => {
    let array: Array<Array<Cell>> = [];
    game.field.field.forEach((y) => {
      array.push([...y]);
    });
    setNewField(array);
  };

  const onClickCell = (x: number, y: number): void => {
    if (isFirstClick) {
      isFirstClick = false;
      isSetTimer(true);
      game.field.setBom(x, y);
    }
    if (game.field.field[y][x].isFlag) {
      return;
    }
    if (game.field.field[y][x].isBom) {
      alert('bomb!');
      game.field.field[y][x].isOpen = true;
      isSetTimer(false);
    }
    game.isonClickmainGame(x, y);
    if (game.field.isAllOpen() && istimer === true) {
      isSetTimer(false);
      setIsClear(true);
    }
    setField();
  };

  const onContextMenuCell = (x: number, y: number): void => {
    if (game.field.field[y][x].isOpen || isFirstClick) {
      return;
    }
    game.field.putFlag(x, y);
    setField();
  };

  const onClickReset = () => {
    isFirstClick = true;
    game.resetGame();
    isSetTimer(false);
    setIsClear(false);
    setField();
  };

  const onClickLevel1 = () => {
    game = new Game(9, 9, 10);
    setField();
    onClickReset();
  };

  const onClickLevel2 = () => {
    game = new Game(16, 16, 40);
    setField();
    onClickReset();
  };

  const onClickLevel3 = () => {
    game = new Game(30, 19, 99);
    setField();
    onClickReset();
  };

  return (
    <>
      <div>爆弾の数:{game.numOfBom}</div>
      <MineSweeperField
        field={newfield}
        onClickCell={onClickCell}
        onContextMenu={onContextMenuCell}
        onClickReset={onClickReset}
      />
      <Timer istimer={istimer} isClear={isClear} />
      <div>操作方法</div>
      <div>右クリック:open</div>
      <div>左クリック:🚩</div>
      <SRow>
        <button onClick={onClickLevel1}>Level1</button>
        <button onClick={onClickLevel2}>Level2</button>
        <button onClick={onClickLevel3}>Level3</button>
      </SRow>
    </>
  );
});
