import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Sprite, Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';

@Injectable({
  providedIn: 'root'
})
export class RockService extends PropsBaseService {
  rocksTextures: Texture[] = [
    this.assetsService.getTexture('rock1') as Texture,
    this.assetsService.getTexture('rock2') as Texture
  ];

  override label: ElementType = ElementType.ROCK;

  override texture: Texture = this.assetsService.getTexture('rock') as Texture;

  override render(id: number): Sprite {
    let sprite: Sprite | null = new Sprite(this.rocksTextures[id % 2]);
    sprite.label = `${this.label}-${id + 1}`;
    return sprite;
  }
}
