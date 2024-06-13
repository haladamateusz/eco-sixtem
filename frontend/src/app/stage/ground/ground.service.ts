import { ElementRef, Injectable } from '@angular/core';
import { Application, Assets, Sprite, Texture, TilingSprite } from 'pixi.js';
import { BooleanMask } from '../../shared/utils/boolean-mask/boolean-mask.class';
import { findSpaceForElement } from '../utils/find-space-for-element.function';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroundService {
  private ground: Application = new Application();

  private groundAssets: { [key: string]: string } = {
    greenGrassTexture: 'assets/stage/ground/bck2_2.png',
    greenGrassTexture2: 'assets/stage/ground/grass3.jpg',
    debris1: 'assets/stage/ground/debris1.png',
    debris2: 'assets/stage/ground/debris2.png',
    debris3: 'assets/stage/ground/debris3.png',
    debris4: 'assets/stage/ground/debris4.png',
    debris5: 'assets/stage/ground/debris5.png',
    plant1: 'assets/stage/ground/plant1.png',
    plant2: 'assets/stage/ground/plant2.png',
    plant3: 'assets/stage/ground/plant3.png',
    plant4: 'assets/stage/ground/plant4.png',
    dog: 'assets/stage/ground/dog.png',
    sheep: 'assets/stage/ground/sheep.png',
    ranger: 'assets/stage/ground/ranger.png',
    rock1: 'assets/stage/ground/rock1.png',
    rock2: 'assets/stage/ground/rock2.png',
    treeDead: 'assets/stage/ground/tree_dead.png',
    treeDying: 'assets/stage/ground/tree_dying.png',
    treeHealthy: 'assets/stage/ground/tree_healthy.png'
  };

  private groundTextures: Map<string, Texture> = new Map<string, Texture>([]);

  private groundBooleanMask!: BooleanMask;

  totalAssets: number = Object.keys(this.groundAssets).length;

  loaded$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  async loadGroundAssets(): Promise<void> {
    let loadedAssets: number = 0;
    for (const [name, path] of Object.entries(this.groundAssets)) {
      const newTexture: Texture = await Assets.load(path, () => {
        loadedAssets++;
        const loaded: number = Math.round((loadedAssets / this.totalAssets) * 100);
        console.log(`loaded ${loaded}% of Ground Assets`);
        this.loaded$.next(loaded);
      });
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

    this.groundBooleanMask = new BooleanMask(grass.width, grass.height);

    this.ground.stage.addChild(grass);
    groundContainer.nativeElement.appendChild(this.ground.canvas);

    this.renderTrees();
    this.renderRanger();
    this.renderDog();
    this.renderSheeps();
  }

  renderTrees(): void {
    const treeTexture: Texture = this.groundTextures.get('treeHealthy') as Texture;

    for (let i: number = 0; i < 20; i++) {
      let tree: Sprite | null = new Sprite(treeTexture);
      tree.scale = 0.25;
      tree.label = `tree-${i + 1}`;

      tree = findSpaceForElement(tree, this.groundBooleanMask, 100, 900, {
        offsetX: 10,
        offsetY: 5
      });

      if (tree !== null) {
        this.ground.stage.addChild(tree);
      }
    }
  }

  renderSheeps(): void {
    const sheepTexture: Texture = this.groundTextures.get('sheep') as Texture;

    for (let i: number = 0; i < 5; i++) {
      let sheep: Sprite | null = new Sprite(sheepTexture);

      sheep = findSpaceForElement(sheep, this.groundBooleanMask, 100, 900, {
        offsetX: 5,
        offsetY: 100
      });

      if (sheep !== null) {
        this.ground.stage.addChild(sheep);
      }
    }
  }

  renderDog(): void {
    const dogTexture: Texture = this.groundTextures.get('dog') as Texture;
    let dog: Sprite | null = new Sprite(dogTexture);

    dog = findSpaceForElement(dog, this.groundBooleanMask, 100, 900, {
      offsetX: 5,
      offsetY: 100
    });

    if (dog !== null) {
      this.ground.stage.addChild(dog);
    }
  }

  renderRanger(): void {
    const rangerTexture: Texture = this.groundTextures.get('ranger') as Texture;

    let ranger: Sprite | null = new Sprite(rangerTexture);
    ranger.scale = 0.75;
    ranger = findSpaceForElement(ranger, this.groundBooleanMask, 100, 900, {
      offsetX: 5,
      offsetY: 100
    });

    if (ranger !== null) {
      this.ground.stage.addChild(ranger);
    }
  }
}
