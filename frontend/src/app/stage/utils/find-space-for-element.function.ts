import { Sprite } from 'pixi.js';
import { BooleanMask } from '../../shared/utils/boolean-mask/boolean-mask.class';

export function findSpaceForElement(
  element: Sprite,
  booleanMask: BooleanMask,
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
    !booleanMask.areaIsFree(
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
  booleanMask.markAreaAsOccupied(
    element.x,
    element.x + element.width,
    element.y,
    element.y + element.height
  );
  return element;
}
