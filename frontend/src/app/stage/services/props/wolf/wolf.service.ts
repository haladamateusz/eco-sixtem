import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';

@Injectable({
  providedIn: 'root'
})
export class WolfService extends PropsBaseService {
  override texture: Texture = this.textureService.getTexture('wolf') as Texture;

  override type: ElementType = ElementType.WOLF;
}
