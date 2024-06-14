import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Sprite, Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';

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

  override label: ElementType = ElementType.DEBRIS;

  override texture: Texture = this.assetsService.getTexture('debris') as Texture;

  override render(id: number): Sprite {
    let sprite: Sprite | null = new Sprite(this.debrisTextures[id % 5]);
    sprite.label = `${this.label}-${id + 1}`;
    return sprite;
  }
}
