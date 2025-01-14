import { Field } from './Field';

export class Game {
  public width: number;
  public height: number;
  public numOfBom: number;
  public field: Field;

  constructor(width: number, height: number, numOfBom: number) {
    this.width = width;
    this.height = height;
    this.numOfBom = numOfBom;
    this.field = new Field(width, height, numOfBom);
  }

  public mainGame = (x: number, y: number) => {
    if (this.field.field[y][x].isFlag || this.field.field[y][x].isBom) {
      return;
    }
    this.field.searchNotBomCell(x, y);
    return;
  };

  public resetGame = () => {
    this.field.resetField();
  };
}
