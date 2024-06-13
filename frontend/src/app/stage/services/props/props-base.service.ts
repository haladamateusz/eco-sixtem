import { inject, Injectable } from '@angular/core';
import { Sprite, Texture } from 'pixi.js';
import { AssetsService } from '../assets/assets.service';

@Injectable({
  providedIn: 'root'
})
export class PropsBaseService {
  protected readonly assetsService: AssetsService = inject(AssetsService);

  scale: number = 1;

  label: string = 'BASE_LABEL';

  texture: Texture = this.assetsService.getTexture('missingAsset') as Texture;

  render(): Sprite {
    let sprite: Sprite | null = new Sprite(this.texture);
    sprite.scale = this.scale;
    return sprite;
  }
}
