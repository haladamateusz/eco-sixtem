import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { ElementType } from '../../../models/element-type.enum';
import { Sprite, Texture } from 'pixi.js';
import { getRandomInteger } from '../../../../shared/utils/get-random-integer.function';

@Injectable({
  providedIn: 'root'
})
export class PlantService extends PropsBaseService {
  plantTextures: Texture[] = [
    this.textureService.getTexture('plant1') as Texture,
    this.textureService.getTexture('plant2') as Texture,
    this.textureService.getTexture('plant3') as Texture,
    this.textureService.getTexture('plant4') as Texture,
    this.textureService.getTexture('flower1') as Texture,
    this.textureService.getTexture('flower2') as Texture
  ];

  override type: ElementType = ElementType.PLANT;

  override render(id: string): Sprite {
    const textureIndex: number = getRandomInteger(0, this.plantTextures.length);
    this.texture = this.plantTextures[textureIndex];
    return super.render(id);
  }
}
