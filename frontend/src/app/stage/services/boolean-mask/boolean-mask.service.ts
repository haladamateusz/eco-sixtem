import { Injectable } from '@angular/core';
import { Sprite } from 'pixi.js';

@Injectable({
  providedIn: 'root'
})
export class BooleanMaskService {
  booleanMask: Array<Array<boolean>> = [];

  initialize(width: number, height: number): void {
    this.booleanMask = Array(height)
      .fill(null)
      .map(() => Array(width).fill(false));
  }

  findSpaceForElement(
    element: Sprite,
    containerHeight: number,
    containerWidth: number,
    options = {
      offsetX: 0,
      offsetY: 0
    }
  ): Sprite | null {
    let attempts: number = 0;

    do {
      element.x = Math.round(options.offsetX + Math.random() * containerWidth);
      element.y = Math.round(options.offsetY + Math.random() * containerHeight);
      ++attempts;
    } while (
      !this.areaIsFree(
        element.x,
        element.x + element.width,
        element.y,
        element.y + element.height
      ) &&
      attempts < 1000
    );

    if (attempts === 1000) {
      return null;
    }
    this.markAreaAsOccupied(
      element.x,
      element.x + element.width,
      element.y,
      element.y + element.height
    );
    return element;
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
