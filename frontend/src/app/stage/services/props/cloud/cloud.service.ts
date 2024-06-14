import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Sprite, Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CloudService extends PropsBaseService {
  cloudTextures: Texture[] = [
    this.assetsService.getTexture('healthyCloudTexture') as Texture,
    this.assetsService.getTexture('pollutedCloudTexture') as Texture
  ];

  override scale: number = 0.5;

  override label: ElementType = ElementType.CLOUD;

  override texture: Texture = this.assetsService.getTexture('healthyCloudTexture') as Texture;

  override render(id: number): Sprite {
    return super.render(id);
  }

  changeTextureToPolluted(): void {
    this.texture = this.cloudTextures[1];
  }

  changeTextureToHealthy(): void {
    this.texture = this.cloudTextures[0];
  }
}
