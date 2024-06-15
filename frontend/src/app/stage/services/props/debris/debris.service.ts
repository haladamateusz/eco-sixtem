import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Sprite, Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';
import { getRandomInteger } from '../../../../shared/utils/get-random-integer.function';

@Injectable({
  providedIn: 'root'
})
export class DebrisService extends PropsBaseService {
  debrisTextures: Texture[] = [
    this.assetsService.getTexture('debris1') as Texture,
    this.assetsService.getTexture('debris2') as Texture,
    this.assetsService.getTexture('debris3') as Texture,
    this.assetsService.getTexture('debris4') as Texture,
    this.assetsService.getTexture('debris5') as Texture
  ];

  override type: ElementType = ElementType.DEBRIS;

  override texture: Texture = this.assetsService.getTexture('debris1') as Texture;

  override render(id: string): Sprite {
    this.texture = this.debrisTextures[getRandomInteger(0, 5)];
    return super.render(id);
  }
}
