import { memo } from 'react';
import { Cell } from '../../class/Cell';
import { SRow } from '../../styles/SRow';
import { PrimaryCell } from '../atom/PrimaryCell';

type Props = {
  field: Array<Array<Cell>>;
  onClickCell: (x: number, y: number) => void;
  onContextMenu: (x: number, y: number) => void;
  onClickReset: () => void;
};

export const MineSweeperField = memo((props: Props) => {
  const { field, onClickCell, onContextMenu, onClickReset } = props;

  let rows: any[] = [];
  field.forEach((y, yIndex) => {
    const cols = y.map((column: any, index: number) => (
      <PrimaryCell
        cell={y[index]}
        x={index}
        y={yIndex}
        onClick={onClickCell}
        onContextMenu={onContextMenu}
        key={`${column}-${index}`}
      />
    ));
    rows.push(
      <SRow className="minesweeper-field_row" key={yIndex}>
        {cols}
      </SRow>
    );
  });
  return (
    <>
      <div className="minesweeper-field_row">{rows}</div>
      <button onClick={() => onClickReset()}>reset</button>
    </>
  );
});
