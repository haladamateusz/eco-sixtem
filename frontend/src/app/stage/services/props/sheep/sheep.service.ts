import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { ElementType } from '../../../models/element-type.enum';
import { Texture } from 'pixi.js';

@Injectable({
  providedIn: 'root'
})
export class SheepService extends PropsBaseService {
  override label: ElementType = ElementType.SHEEP;

  override texture: Texture = this.assetsService.getTexture('sheep') as Texture;
}
