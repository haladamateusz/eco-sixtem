import { inject, Injectable } from '@angular/core';
import { FederatedPointerEvent, Sprite, Texture } from 'pixi.js';
import { TextureService } from '../texture/texture.service';
import { ElementType } from '../../models/element-type.enum';
import { PropDetailsService } from '../prop-detail/prop-details.service';

@Injectable({
  providedIn: 'root'
})
export class PropsBaseService {
  protected readonly textureService: TextureService = inject(TextureService);

  protected readonly propDetailService: PropDetailsService = inject(PropDetailsService);

  scale: number = 1;

  type: ElementType = ElementType.DEFAULT;

  texture: Texture = this.textureService.getTexture('') as Texture;

  render(id: string): Sprite {
    let sprite: Sprite = new Sprite(this.texture);

    sprite.scale = this.scale;
    sprite.eventMode = 'static';
    sprite.label = id;

    sprite.onclick = (event: FederatedPointerEvent): void => {
      event.preventDefault();
      this.propDetailService.propClicked({
        x: event.x,
        y: event.y,
        ISIN_BC: event.target.label
      });
    };

    return sprite;
  }
}
