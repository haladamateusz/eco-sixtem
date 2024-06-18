import { Injectable } from '@angular/core';
import { Assets, Texture } from 'pixi.js';

@Injectable({
  providedIn: 'root'
})
export class TextureService {
  private textures: Map<string, Texture> = new Map<string, Texture>([]);

  private grassAssets: { [key: string]: string } = {
    greenGrassTexture: 'assets/stage/ground/bck2_2.png',
    greenGrassTexture2: 'assets/stage/ground/grass3.jpg',
    desertTexture: 'assets/stage/ground/bck1_2.png'
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
    plant4: 'assets/stage/ground/plants/plant4.png',
    flower1: 'assets/stage/ground/plants/flower1.png',
    flower2: 'assets/stage/ground/plants/flower2.png'
  };

  private treeAssets: { [key: string]: string } = {
    treeHealthy: 'assets/stage/ground/trees/tree_healthy.png',
    treeDying: 'assets/stage/ground/trees/tree_dying.png',
    treeDead: 'assets/stage/ground/trees/tree_dead.png'
  };

  private animalAssets: { [key: string]: string } = {
    dog: 'assets/stage/ground/animals/dog.png',
    sheep1: 'assets/stage/ground/animals/sheep1.png',
    sheep2: 'assets/stage/ground/animals/sheep2.png',
    wolf: 'assets/stage/ground/animals/wolf.png',
    bug: 'assets/stage/ground/animals/bug.png',
    ant: 'assets/stage/ground/animals/ant.png',
    chicken: 'assets/stage/ground/animals/chicken.png',
    vermin: 'assets/stage/ground/animals/vermin.png'
  };

  private rockAssets: { [key: string]: string } = {
    rock1: 'assets/stage/ground/rocks/rock1.png',
    rock2: 'assets/stage/ground/rocks/rock2.png'
  };

  private skyAssets: { [key: string]: string } = {
    skyboxTexture: 'assets/stage/sky/skybox.png',
    skyboxPollutedTexture: 'assets/stage/sky/skybox_polluted.png',
    healthyCloudTexture: 'assets/stage/sky/cloud_healthy.png',
    pollutedCloudTexture: 'assets/stage/sky/cloud_polluted.png'
  };

  private missingAssets: { [key: string]: string } = {
    missingTexture: 'assets/stage/missing_texture.png'
  };

  private rangerAssets: { [key: string]: string } = {
    ranger: 'assets/stage/ground/ranger.png'
  };

  private caretAssets: { [key: string]: string } = {
    caret_one_up_stroke: 'assets/carets/one_up_stroke.svg',
    caret_one_down_stroke: 'assets/carets/one_down_stroke.svg',
    caret_two_up_stroke: 'assets/carets/two_up_stroke.svg',
    caret_two_down_stroke: 'assets/carets/two_down_stroke.svg',
    caret_three_up_stroke: 'assets/carets/three_up_stroke.svg',
    caret_three_down_stroke: 'assets/carets/three_down_stroke.svg'
  };

  async loadAssets(): Promise<void> {
    const assets: { [key: string]: string } = {
      ...this.grassAssets,
      ...this.debrisAssets,
      ...this.plantAssets,
      ...this.treeAssets,
      ...this.animalAssets,
      ...this.rockAssets,
      ...this.skyAssets,
      ...this.missingAssets,
      ...this.rangerAssets,
      ...this.caretAssets
    };

    for (const [name, path] of Object.entries(assets)) {
      const newTexture: Texture = await Assets.load(path);
      this.textures.set(name, newTexture);
    }
  }

  getTexture(name: string): Texture {
    return this.textures.has(name)
      ? (this.textures.get(name) as Texture)
      : (this.textures.get('missingTexture') as Texture);
  }
}
