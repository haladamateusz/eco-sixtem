import { ElementRef, Injectable } from '@angular/core';
import { Application, Assets, Texture, TilingSprite } from 'pixi.js';
import { BooleanMask } from '../../shared/utils/boolean-mask/boolean-mask.class';

@Injectable({
  providedIn: 'root'
})
export class GroundService {
  private ground: Application = new Application();

  private groundAssets: { [key: string]: string } = {
    greenGrassTexture: 'assets/stage/ground/bck2_2.png',
    greenGrassTexture2: 'assets/stage/ground/grass3.jpg'
  };

  private groundTextures: Map<string, Texture> = new Map<string, Texture>([]);

  private groundBooleanMask: BooleanMask | null = null;

  async loadGroundAssets(): Promise<void> {
    for (const [name, path] of Object.entries(this.groundAssets)) {
      console.log('loading:', name);
      const newTexture: Texture = await Assets.load(path);
      this.groundTextures.set(name, newTexture);
    }
  }

  async loadGround(groundContainer: ElementRef): Promise<void> {
    await this.loadGroundAssets();

    await this.ground.init({
      background: '#10bb49',
      width: groundContainer.nativeElement.offsetWidth,
      height: 300
    });

    const groundTexture: Texture = this.groundTextures.get('greenGrassTexture2') as Texture;

    const grass: TilingSprite = new TilingSprite({
      texture: groundTexture,
      width: groundContainer.nativeElement.offsetWidth * 2,
      height: 300 * 2,
      scale: 0.5
    });

    this.ground.stage.addChild(grass);
    groundContainer.nativeElement.appendChild(this.ground.canvas);
  }
}
