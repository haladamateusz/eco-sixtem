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
    this.assetsService.getTexture('plant1') as Texture,
    this.assetsService.getTexture('plant2') as Texture,
    this.assetsService.getTexture('plant3') as Texture,
    this.assetsService.getTexture('plant4') as Texture
  ];

  override type: ElementType = ElementType.PLANT;

  override render(id: string): Sprite {
    this.texture = this.plantTextures[getRandomInteger(0, 4)];
    return super.render(id);
  }
}
