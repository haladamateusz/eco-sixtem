export class BooleanMask {
  booleanMask: Array<Array<boolean>> = [];

  constructor(width: number, height: number) {
    this.booleanMask = Array(height)
      .fill(null)
      .map(() => Array(width).fill(false));
  }

  areaIsFree(startX: number, endX: number, startY: number, endY: number): boolean {
    for (let y: number = startY; y < endY; y++) {
      for (let x: number = startX; x < endX; x++) {
        if (this.booleanMask[y][x]) {
          return false;
        }
      }
    }
    return true;
  }

  markAreaAsOccupied(startX: number, endX: number, startY: number, endY: number): void {
    for (let y: number = startY; y < endY; y++) {
      for (let x: number = startX; x < endX; x++) {
        this.booleanMask[y][x] = true;
      }
    }
  }
}
