import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Texture } from 'pixi.js';

@Injectable({
  providedIn: 'root'
})
export class CloudService extends PropsBaseService {
  override scale: number = 0.5;

  override label: string = 'cloud';

  override texture: Texture = this.assetsService.getTexture('healthyCloudTexture') as Texture;
}
