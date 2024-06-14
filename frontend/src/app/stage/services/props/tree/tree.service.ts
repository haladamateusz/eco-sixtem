import { Injectable } from '@angular/core';
import { PropsBaseService } from '../props-base.service';
import { Texture } from 'pixi.js';
import { ElementType } from '../../../models/element-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TreeService extends PropsBaseService {
  treeTextures: Texture[] = [
    this.assetsService.getTexture('treeHealthy') as Texture,
    this.assetsService.getTexture('treeDying') as Texture,
    this.assetsService.getTexture('treeDead') as Texture
  ];
  override scale: number = 0.25;

  override label: ElementType = ElementType.TREE;

  override texture: Texture = this.assetsService.getTexture('treeHealthy') as Texture;

  changeTreeTextureToDead(): void {
    this.texture = this.treeTextures[2];
  }

  changeTreeTextureToHealthy(): void {
    this.texture = this.treeTextures[0];
  }
}
