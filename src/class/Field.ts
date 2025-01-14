import { getRandomInt } from '../function/getRandomInt';
import { Cell } from './Cell';

export class Field {
  public width: number;
  public height: number;
  public numOfBom: number;
  public field: Array<Array<Cell>>;

  constructor(width: number, height: number, numOfBom: number) {
    this.width = width;
    this.height = height;
    this.numOfBom = numOfBom;
    this.field = (function () {
      let field: Array<Array<Cell>> = [[]];
      for (let h = 0; h < height; h++) {
        field.push([]);
        for (let w = 0; w < width; w++) {
          field[h].push(new Cell());
        }
      }
      return field;
    })();
  }

  public setBom = (x: number, y: number) => {
    let bombx: number;
    let bomby: number;
    for (let n = 0; n < this.numOfBom; n++) {
      while (true) {
        bombx = getRandomInt(0, this.width);
        bomby = getRandomInt(0, this.height);
        if (
          (x - 1 <= bombx && bombx <= x + 1) ||
          (y - 1 <= bomby && bomby <= y + 1)
        ) {
          continue;
        } else if(this.field[bomby][bombx].isBom === true){
          continue;
        } else{
          break;
        }
      }
      this.field[bomby][bombx].isBom = true;
      console.log(x, y);
    }
  };

  // 周辺のボムの個数を調べる
  public searchBom = (x: number, y: number): number => {
    let numBom: number = 0;
    for (let col = -1; col <= 1; col++) {
      for (let row = -1; row <= 1; row++) {
        if (this.isNotField(row + x, col + y)) {
          continue;
        }

        if (this.field[col + y][row + x].isBom) {
          numBom += 1;
        }
      }
    }
    this.field[y][x].numOfAroundBom = numBom;
    console.log(x, y, numBom);
    return numBom;
  };

  // 爆弾の置かれていないセルを探索
  public searchNotBomCell = (x: number, y: number) => {
    if (this.field[y][x].isOpen || this.field[y][x].isBom) {
      this.field[y][x].isOpen = true;
      return;
    }
    let numBom = this.searchBom(x, y);
    this.field[y][x].isOpen = true;
    if (numBom) {
      return;
    }
    for (let col = -1; col <= 1; col++) {
      for (let row = -1; row <= 1; row++) {
        if (this.isNotField(row + x, col + y)) {
          continue;
        }
        this.searchNotBomCell(row + x, col + y);
      }
    }
  };

  public putFlag = (x: number, y: number) => {
    this.field[y][x].isFlag = !this.field[y][x].isFlag;
    console.log(this.field[y][x].isFlag);
  };

  // ゲーム終了条件　爆弾がないセルをすべて開けていたらtrue
  public isAllOpen = (): boolean => {
    let flag = true;
    this.field.forEach((col) => {
      col.forEach((row) => {
        if (!row.isBom && !row.isOpen) {
          flag = false;
        }
      });
    });
    return flag;
  };

  // フィールドの外ならtrue
  public isNotField = (x: number, y: number) => {
    if (y < 0 || y >= this.height || x < 0 || x >= this.width) {
      return true;
    }
    return false;
  };

  public resetField = () => {
    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        this.field[h][w].resetCell();
      }
    }
  };
}
