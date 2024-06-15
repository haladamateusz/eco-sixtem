import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Sprite, Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';
import { getRandomInteger } from '../../../../shared/utils/get-random-integer.function';

@Injectable({
  providedIn: 'root'
})
export class RockService extends PropsBaseService {
  rocksTextures: Texture[] = [
    this.assetsService.getTexture('rock1') as Texture,
    this.assetsService.getTexture('rock2') as Texture
  ];

  override type: ElementType = ElementType.ROCK;

  override texture: Texture = this.assetsService.getTexture('rock1') as Texture;

  override render(id: string): Sprite {
    this.texture = this.rocksTextures[getRandomInteger(0, 4)];
    return super.render(id);
  }
}
