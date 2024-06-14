import { Injectable } from '@angular/core';
import { Sprite } from 'pixi.js';

@Injectable({
  providedIn: 'root'
})
export class BooleanMaskService {
  booleanMask: Array<Array<boolean>> = [];

  height: number = 0;

  width: number = 0;

  initialize(width: number, height: number): void {
    this.height = height;
    this.width = width;
    this.booleanMask = Array(height)
      .fill(null)
      .map(() => Array(width).fill(false));
  }

  reset(): void {
    this.booleanMask = Array(this.height)
      .fill(null)
      .map(() => Array(this.width).fill(false));
  }

  findSpaceForElement(
    element: Sprite,
    containerHeight: number,
    containerWidth: number
  ): Sprite | null {
    let attempts: number = 0;

    do {
      element.x = Math.round(Math.random() * containerWidth);
      element.y = Math.round(Math.random() * containerHeight);
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
