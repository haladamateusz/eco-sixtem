import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ChickenService extends PropsBaseService {
  override texture: Texture = this.textureService.getTexture('chicken') as Texture;

  override type: ElementType = ElementType.CHICKEN;
}