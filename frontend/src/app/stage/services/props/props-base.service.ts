import { inject, Injectable } from '@angular/core';
import { FederatedPointerEvent, Sprite, Texture } from 'pixi.js';
import { TextureService } from '../texture/texture.service';
import { ElementType } from '../../models/element-type.enum';

@Injectable({
  providedIn: 'root'
})
export class PropsBaseService {
  protected readonly assetsService: TextureService = inject(TextureService);

  scale: number = 1;

  type: ElementType = ElementType.DEFAULT;

  texture: Texture = this.assetsService.getTexture('') as Texture;

  render(id: string): Sprite {
    let sprite: Sprite = new Sprite(this.texture);

    sprite.scale = this.scale;
    sprite.eventMode = 'static';

    sprite.onclick = (event: FederatedPointerEvent): void => {
      event.stopPropagation();
      console.log(window.scrollY, window.scrollX);
      console.log(event.clientY, event.clientX);
      console.log(event.target.label);
    };

    return sprite;
  }
}
