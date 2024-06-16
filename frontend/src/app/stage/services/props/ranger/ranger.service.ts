import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';

@Injectable({
  providedIn: 'root'
})
export class RangerService extends PropsBaseService {
  override type: ElementType = ElementType.RANGER;

  override scale: number = 0.75;

  override texture: Texture = this.textureService.getTexture('ranger') as Texture;

  //TODO: add ranger click event
}
