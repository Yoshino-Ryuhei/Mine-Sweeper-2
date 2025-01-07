import { memo } from 'react';
import { Cell } from '../../class/Cell';
import { SBlock } from '../../styles/SBlock';
import { SPositionAbsolute } from '../../styles/SPositionAbsolute';

type Props = {
  cell: Cell;
  x: number;
  y: number;
  onClick: (x: number, y: number) => void;
  onContextMenu: (x: number, y: number) => void;
  children?: string;
};

export const PrimaryCell = memo((props: Props) => {
  const { cell, x, y, onClick, onContextMenu, children } = props;
  return (
    <SPositionAbsolute>
      <SBlock
        isOpen={cell.isOpen}
        isBom={cell.isBom}
        isFlag={cell.isFlag}
        numOfAroundBom={cell.numOfAroundBom}
        children={children}
        onClick={() => onClick(x, y)}
        onContextMenu={() => onContextMenu(x, y)}
        id={'cell'}
        className={`${x}-${y}`}
      />
    </SPositionAbsolute>
  );
});
