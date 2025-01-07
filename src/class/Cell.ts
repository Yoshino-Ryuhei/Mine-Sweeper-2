export class Cell {
  public isOpen: boolean;
  public isBom: boolean;
  public isFlag: boolean;
  public numOfAroundBom: number;

  constructor() {
    this.isOpen = false;
    this.isBom = false;
    this.isFlag = false;
    this.numOfAroundBom = 0;
  }

  public resetCell = () => {
    this.isOpen = false;
    this.isBom = false;
    this.isFlag = false;
    this.numOfAroundBom = 0;
  };
}
