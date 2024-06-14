import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { ElementType } from '../../../models/element-type.enum';
import { Sprite, Texture } from 'pixi.js';

@Injectable({
  providedIn: 'root'
})
export class PlantService extends PropsBaseService {
  plantTextures: Texture[] = [
    this.assetsService.getTexture('plant1') as Texture,
    this.assetsService.getTexture('plant2') as Texture,
    this.assetsService.getTexture('plant3') as Texture,
    this.assetsService.getTexture('plant4') as Texture
  ];

  override label: ElementType = ElementType.PLANT;

  override texture: Texture = this.assetsService.getTexture('plant') as Texture;

  override render(id: number): Sprite {
    let sprite: Sprite | null = new Sprite(this.plantTextures[id % 4]);
    sprite.label = `${this.label}-${id + 1}`;
    return sprite;
  }
}
