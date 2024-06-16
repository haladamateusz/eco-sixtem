import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { FederatedPointerEvent, Sprite, Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CloudService extends PropsBaseService {
  cloudTextures: Texture[] = [
    this.textureService.getTexture('healthyCloudTexture') as Texture,
    this.textureService.getTexture('pollutedCloudTexture') as Texture
  ];

  override scale: number = 0.5;

  override type: ElementType = ElementType.CLOUD;

  override texture: Texture = this.textureService.getTexture('healthyCloudTexture') as Texture;

  changeTextureToPolluted(): void {
    this.texture = this.cloudTextures[1];
  }

  changeTextureToHealthy(): void {
    this.texture = this.cloudTextures[0];
  }

  override render(id: string): Sprite {
    const sprite: Sprite = super.render(id);
    sprite.eventMode = 'dynamic';

    sprite.onclick = (event: FederatedPointerEvent): void => {
      event.stopPropagation();
      this.propDetailService.propClicked({
        x: event.x,
        y: event.y,
        ISIN_BC: event.target.label
      });
    };

    return sprite;
  }
}
