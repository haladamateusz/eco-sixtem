import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DogService extends PropsBaseService {
  override texture: Texture = this.textureService.getTexture('dog') as Texture;

  override type: ElementType = ElementType.DOG;
}
