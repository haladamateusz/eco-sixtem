import { Injectable } from '@angular/core';
import { Assets, Texture } from 'pixi.js';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private textures: Map<string, Texture> = new Map<string, Texture>([]);

  private grassAssets: { [key: string]: string } = {
    greenGrassTexture: 'assets/stage/ground/bck2_2.png',
    greenGrassTexture2: 'assets/stage/ground/grass3.jpg'
  };

  private debrisAssets: { [key: string]: string } = {
    debris1: 'assets/stage/ground/debris/debris1.png',
    debris2: 'assets/stage/ground/debris/debris2.png',
    debris3: 'assets/stage/ground/debris/debris3.png',
    debris4: 'assets/stage/ground/debris/debris4.png',
    debris5: 'assets/stage/ground/debris/debris5.png'
  };

  private plantAssets: { [key: string]: string } = {
    plant1: 'assets/stage/ground/plants/plant1.png',
    plant2: 'assets/stage/ground/plants/plant2.png',
    plant3: 'assets/stage/ground/plants/plant3.png',
    plant4: 'assets/stage/ground/plants/plant4.png'
  };

  private treeAssets: { [key: string]: string } = {
    treeDead: 'assets/stage/ground/trees/tree_dead.png',
    treeDying: 'assets/stage/ground/trees/tree_dying.png',
    treeHealthy: 'assets/stage/ground/trees/tree_healthy.png'
  };

  private animalAssets: { [key: string]: string } = {
    dog: 'assets/stage/ground/animals/dog.png',
    sheep: 'assets/stage/ground/animals/sheep.png'
  };

  private rockAssets: { [key: string]: string } = {
    rock1: 'assets/stage/ground/rocks/rock1.png',
    rock2: 'assets/stage/ground/rocks/rock2.png'
  };

  private skyAssets: { [key: string]: string } = {
    skyboxTexture: 'assets/stage/sky/skybox.png',
    healthyCloudTexture: 'assets/stage/sky/cloud_healthy.png',
    dyingCloudTexture: 'assets/stage/sky/cloud_polluted.png'
  };

  private missingAsset: string = 'assets/stage/missing_texture.png';
  private rangerAsset = 'assets/stage/ground/ranger.png';

  async loadAssets(): Promise<void> {
    const assets: { [key: string]: string } = {
      ...this.grassAssets,
      ...this.debrisAssets,
      ...this.plantAssets,
      ...this.treeAssets,
      ...this.animalAssets,
      ...this.rockAssets,
      ...this.skyAssets,
      ...{ missingTexture: this.missingAsset, ranger: this.rangerAsset }
    };

    for (const [name, path] of Object.entries(assets)) {
      const newTexture: Texture = await Assets.load(path);
      this.textures.set(name, newTexture);
    }
  }

  getTexture(name: string): Texture {
    return this.textures.get(name) as Texture;
  }
}
