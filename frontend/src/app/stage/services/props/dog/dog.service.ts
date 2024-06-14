import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DogService extends PropsBaseService {
  override texture: Texture = this.assetsService.getTexture('dog') as Texture;

  override label: ElementType = ElementType.DOG;
}
