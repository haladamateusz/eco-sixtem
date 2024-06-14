import { inject, Injectable } from '@angular/core';
import { Sprite, Texture } from 'pixi.js';
import { TextureService } from '../texture/texture.service';
import { ElementType } from '../../models/element-type.enum';

@Injectable({
  providedIn: 'root'
})
export class PropsBaseService {
  protected readonly assetsService: TextureService = inject(TextureService);

  scale: number = 1;

  label: ElementType = ElementType.DEFAULT;

  texture: Texture = this.assetsService.getTexture('') as Texture;

  render(id: number): Sprite {
    let sprite: Sprite | null = new Sprite(this.texture);
    sprite.label = `${this.label}-${id}`;
    sprite.scale = this.scale;
    return sprite;
  }
}
