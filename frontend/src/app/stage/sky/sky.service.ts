import { ElementRef, Injectable } from '@angular/core';
import { Application, Assets, Sprite, Texture } from 'pixi.js';
import { BooleanMask } from '../../shared/utils/boolean-mask/boolean-mask.class';

@Injectable({
  providedIn: 'root'
})
export class SkyService {
  private sky: Application = new Application();

  private skyAssets: { [key: string]: string } = {
    skyboxTexture: 'assets/stage/sky/skybox.png',
    healthyCloudTexture: 'assets/stage/sky/cloud_healthy.png',
    pollutedCloudTexture: 'assets/stage/sky//cloud_polluted.png'
  };

  private skyTextures: Map<string, Texture> = new Map<string, Texture>([]);

  private skyBooleanMask: BooleanMask | null = null;

  private async loadSkyAssets(): Promise<void> {
    for (const [name, path] of Object.entries(this.skyAssets)) {
      console.log('loading:', name);
      const newTexture: Texture = await Assets.load(path);
      this.skyTextures.set(name, newTexture);
    }
  }

  async loadSky(skyContainer: ElementRef): Promise<void> {
    await this.loadSkyAssets();

    await this.sky.init({
      background: '#1099bb',
      width: skyContainer.nativeElement.offsetWidth,
      height: 200
    });

    const skyboxTexture: Texture = this.skyTextures.get('skyboxTexture') as Texture;

    const skybox: Sprite = new Sprite(skyboxTexture);
    skybox.width = this.sky.screen.width;
    skybox.height = this.sky.screen.height;
    skybox.label = 'skybox';

    this.skyBooleanMask = new BooleanMask(skybox.width, skybox.height);

    this.sky.stage.addChild(skybox);
    skyContainer.nativeElement.appendChild(this.sky.canvas);

    this.renderClouds();
  }

  private renderClouds(): void {
    const cloudTexture: Texture = this.skyTextures.get('healthyCloudTexture') as Texture;
    const clouds: Sprite[] = [];

    for (let i: number = 0; i < 20; i++) {
      let attempts: number = 0;

      const cloud: Sprite = new Sprite(cloudTexture);
      cloud.scale = 0.5;
      cloud.label = `cloud-${i + 1}`;

      do {
        cloud.x = Math.round(30 + Math.random() * 900);
        cloud.y = Math.round(30 + Math.random() * 80);
        ++attempts;
      } while (
        !this.skyBooleanMask?.areaIsFree(
          cloud.x,
          cloud.x + cloud.width,
          cloud.y,
          cloud.y + cloud.height
        ) &&
        attempts < 1000
      );

      if (attempts === 1000) continue;

      this.skyBooleanMask?.markAreaAsOccupied(
        cloud.x,
        cloud.x + cloud.width,
        cloud.y,
        cloud.y + cloud.height
      );

      clouds.push(cloud);
      this.sky.stage.addChild(cloud);
    }

    let count = 0;
    this.sky.ticker.add(() => {
      count += 0.01;

      clouds.forEach((cloud: Sprite, index: number) => {
        if (index % 8 === 0) {
          cloud.x = cloud.x + Math.cos(count) * 0.15;
          cloud.y = cloud.y + Math.sin(count) * 0.15;
        } else if (index % 8 === 1) {
          cloud.x = cloud.x - Math.cos(count) * 0.15;
          cloud.y = cloud.y - Math.sin(count) * 0.15;
        } else if (index % 8 === 2) {
          cloud.x = cloud.x + Math.cos(count) * 0.15;
          cloud.y = cloud.y - Math.sin(count) * 0.15;
        } else if (index % 8 === 3) {
          cloud.x = cloud.x - Math.cos(count) * 0.15;
          cloud.y = cloud.y + Math.sin(count) * 0.15;
        } else if (index % 8 === 4) {
          cloud.x = cloud.x + Math.sin(count) * 0.15;
          cloud.y = cloud.y + Math.cos(count) * 0.15;
        } else if (index % 8 === 5) {
          cloud.x = cloud.x - Math.sin(count) * 0.2;
          cloud.y = cloud.y - Math.cos(count) * 0.2;
        } else if (index % 8 === 6) {
          cloud.x = cloud.x + Math.sin(count) * 0.1;
          cloud.y = cloud.y - Math.cos(count) * 0.1;
        } else if (index % 8 === 7) {
          cloud.x = cloud.x - Math.sin(count) * 0.15;
          cloud.y = cloud.y + Math.cos(count) * 0.15;
        }
      });
    });
  }
}
