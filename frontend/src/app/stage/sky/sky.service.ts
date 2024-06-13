import { ElementRef, Injectable } from '@angular/core';
import { Application, Assets, ContainerChild, Sprite, Texture } from 'pixi.js';
import { BooleanMask } from '../../shared/utils/boolean-mask/boolean-mask.class';
import { findSpaceForElement } from '../utils/find-space-for-element.function';
import { BehaviorSubject } from 'rxjs';

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

  // remember to initialize booleanMask in loadSky method
  private skyBooleanMask!: BooleanMask;

  totalAssets: number = Object.keys(this.skyAssets).length;

  loaded$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private async loadSkyAssets(): Promise<void> {
    let loadedAssets: number = 0;
    for (const [name, path] of Object.entries(this.skyAssets)) {
      const newTexture: Texture = await Assets.load(path, () => {
        loadedAssets++;
        const loaded: number = Math.round((loadedAssets / this.totalAssets) * 100);
        console.log(`loaded ${loaded}% of Ground Assets`);
        this.loaded$.next(loaded);
      });
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
    this.animateClouds();
  }

  private renderClouds(): void {
    const cloudTexture: Texture = this.skyTextures.get('healthyCloudTexture') as Texture;

    for (let i: number = 0; i < 20; i++) {
      let cloud: Sprite | null = new Sprite(cloudTexture);
      cloud.scale = 0.5;
      cloud.label = `cloud-${i + 1}`;

      cloud = findSpaceForElement(cloud, this.skyBooleanMask, 100, 900, {
        offsetX: 30,
        offsetY: 30
      });

      if (cloud !== null) {
        this.sky.stage.addChild(cloud);
      }
    }
  }

  private animateClouds(): void {
    let count: number = 0;
    const clouds: Sprite[] = this.sky.stage.children.filter((child: ContainerChild) =>
      child.label.includes('cloud')
    ) as Sprite[];

    this.sky.ticker.add(() => {
      count += 0.01;

      clouds.forEach((cloud: Sprite, index: number): void => {
        if (index % 8 === 0) {
          cloud.x = cloud.x + Math.cos(count) * 0.04;
          cloud.y = cloud.y + Math.sin(count) * 0.04;
        } else if (index % 8 === 1) {
          cloud.x = cloud.x - Math.cos(count) * 0.02;
          cloud.y = cloud.y - Math.sin(count) * 0.02;
        } else if (index % 8 === 2) {
          cloud.x = cloud.x + Math.cos(count) * 0.06;
          cloud.y = cloud.y - Math.sin(count) * 0.06;
        } else if (index % 8 === 3) {
          cloud.x = cloud.x - Math.cos(count) * 0.04;
          cloud.y = cloud.y + Math.sin(count) * 0.04;
        } else if (index % 8 === 4) {
          cloud.x = cloud.x + Math.sin(count) * 0.06;
          cloud.y = cloud.y + Math.cos(count) * 0.06;
        } else if (index % 8 === 5) {
          cloud.x = cloud.x - Math.sin(count) * 0.08;
          cloud.y = cloud.y - Math.cos(count) * 0.08;
        } else if (index % 8 === 6) {
          cloud.x = cloud.x + Math.sin(count) * 0.04;
          cloud.y = cloud.y - Math.cos(count) * 0.04;
        } else if (index % 8 === 7) {
          cloud.x = cloud.x - Math.sin(count) * 0.03;
          cloud.y = cloud.y + Math.cos(count) * 0.03;
        }
      });
    });
  }
}
