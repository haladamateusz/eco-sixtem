import { inject, Injectable } from '@angular/core';
import { Sprite, Texture } from 'pixi.js';
import { TextureService } from '../texture/texture.service';
import { CaretType } from '../../models/caret-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CaretService {
  private readonly textureService: TextureService = inject(TextureService);

  caretTextures: Texture[] = [
    this.textureService.getTexture('caret_three_up_stroke') as Texture,
    this.textureService.getTexture('caret_two_up_stroke') as Texture,
    this.textureService.getTexture('caret_one_up_stroke') as Texture,
    this.textureService.getTexture('caret_one_down_stroke') as Texture,
    this.textureService.getTexture('caret_two_down_stroke') as Texture,
    this.textureService.getTexture('caret_three_down_stroke') as Texture
  ];

  renderCaret(x: number, y: number, id: string, caretTextureIndex: number): Sprite {
    const caretTexture = this.caretTextures[caretTextureIndex];
    const sprite: Sprite = new Sprite(caretTexture);

    sprite.x = x;
    sprite.y = y;
    sprite.eventMode = 'static';
    sprite.label = `caret@${id}`;

    return sprite;
  }

  getCaretTextureIndex(revenue: number): CaretType {
    if (revenue > 0 && revenue < 10) {
      return CaretType.ONE_UP;
    }
    if (revenue > 10 && revenue < 100) {
      return CaretType.TWO_UP;
    }
    if (revenue > 100) {
      return CaretType.THREE_UP;
    }
    if (revenue < 0 && revenue > -10) {
      return CaretType.ONE_DOWN;
    }
    if (revenue < -10 && revenue > -100) {
      return CaretType.TWO_DOWN;
    }
    if (revenue < -100) {
      return CaretType.THREE_DOWN;
    }
    return CaretType.NO_CHANGE;
  }
}
