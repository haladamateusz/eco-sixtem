import { ElementRef, Injectable } from '@angular/core';
import { Application, Assets, Sprite, Texture, TilingSprite } from 'pixi.js';
import { BooleanMask } from '../../shared/utils/boolean-mask/boolean-mask.class';
import { findSpaceForElement } from '../utils/find-space-for-element.function';

@Injectable({
  providedIn: 'root'
})
export class GroundService {
  private ground: Application = new Application();

  private groundAssets: { [key: string]: string } = {
    greenGrassTexture: 'assets/stage/ground/bck2_2.png',
    greenGrassTexture2: 'assets/stage/ground/grass3.jpg',
    debris1: 'assets/stage/ground/debris/debris1.png',
    debris2: 'assets/stage/ground/debris/debris2.png',
    debris3: 'assets/stage/ground/debris/debris3.png',
    debris4: 'assets/stage/ground/debris/debris4.png',
    debris5: 'assets/stage/ground/debris/debris5.png',
    plant1: 'assets/stage/ground/plants/plant1.png',
    plant2: 'assets/stage/ground/plants/plant2.png',
    plant3: 'assets/stage/ground/plants/plant3.png',
    plant4: 'assets/stage/ground/plants/plant4.png',
    dog: 'assets/stage/ground/animals/dog.png',
    sheep: 'assets/stage/ground/animals/sheep.png',
    ranger: 'assets/stage/ground/ranger.png',
    rock1: 'assets/stage/ground/rocks/rock1.png',
    rock2: 'assets/stage/ground/rocks/rock2.png',
    treeDead: 'assets/stage/ground/trees/tree_dead.png',
    treeDying: 'assets/stage/ground/trees/tree_dying.png',
    treeHealthy: 'assets/stage/ground/trees/tree_healthy.png'
  };

  private groundTextures: Map<string, Texture> = new Map<string, Texture>([]);

  private groundBooleanMask!: BooleanMask;

  private containerWidth: number = 0;

  async loadGroundAssets(): Promise<void> {
    for (const [name, path] of Object.entries(this.groundAssets)) {
      const newTexture: Texture = await Assets.load(path);
      this.groundTextures.set(name, newTexture);
    }
  }

  async loadGround(groundContainer: ElementRef): Promise<void> {
    this.containerWidth = groundContainer.nativeElement.offsetWidth - 30; // small offset

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
    this.renderSheep();
    this.renderPlants();
    this.renderRocks();
    this.renderDebris();
  }

  renderTrees(): void {
    const treeTexture: Texture = this.groundTextures.get('treeHealthy') as Texture;

    for (let i: number = 0; i < 20; i++) {
      let tree: Sprite | null = new Sprite(treeTexture);
      tree.scale = 0.25;
      tree.label = `tree-${i + 1}`;

      tree = findSpaceForElement(tree, this.groundBooleanMask, 100, this.containerWidth, {
        offsetX: 10,
        offsetY: 5
      });

      if (tree !== null) {
        this.ground.stage.addChild(tree);
      }
    }
  }

  renderSheep(): void {
    const sheepTexture: Texture = this.groundTextures.get('sheep') as Texture;

    for (let i: number = 0; i < 5; i++) {
      let sheep: Sprite | null = new Sprite(sheepTexture);

      sheep = findSpaceForElement(sheep, this.groundBooleanMask, 100, this.containerWidth, {
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

    dog = findSpaceForElement(dog, this.groundBooleanMask, 100, this.containerWidth, {
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
    ranger = findSpaceForElement(ranger, this.groundBooleanMask, 100, this.containerWidth, {
      offsetX: 5,
      offsetY: 100
    });

    if (ranger !== null) {
      this.ground.stage.addChild(ranger);
    }
  }

  renderPlants(): void {
    const plants: Texture[] = [];
    plants.push(this.groundTextures.get('plant1') as Texture);
    plants.push(this.groundTextures.get('plant2') as Texture);
    plants.push(this.groundTextures.get('plant3') as Texture);
    plants.push(this.groundTextures.get('plant4') as Texture);

    for (let i: number = 0; i < 30; i++) {
      let plant: Sprite | null = new Sprite(plants[i % 4]);
      plant = findSpaceForElement(plant, this.groundBooleanMask, 220, this.containerWidth, {
        offsetX: 5,
        offsetY: 50
      });

      if (plant !== null) {
        this.ground.stage.addChild(plant);
      }
    }
  }

  renderRocks(): void {
    const rocks: Texture[] = [];
    rocks.push(this.groundTextures.get('rock1') as Texture);
    rocks.push(this.groundTextures.get('rock2') as Texture);

    for (let i: number = 0; i < 30; i++) {
      let rock: Sprite | null = new Sprite(rocks[i % 2]);
      rock = findSpaceForElement(rock, this.groundBooleanMask, 230, this.containerWidth, {
        offsetX: 5,
        offsetY: 50
      });

      if (rock !== null) {
        this.ground.stage.addChild(rock);
      }
    }
  }

  renderDebris(): void {
    const debris: Texture[] = [];
    debris.push(this.groundTextures.get('debris1') as Texture);
    debris.push(this.groundTextures.get('debris2') as Texture);
    debris.push(this.groundTextures.get('debris3') as Texture);
    debris.push(this.groundTextures.get('debris4') as Texture);
    debris.push(this.groundTextures.get('debris5') as Texture);

    for (let i: number = 0; i < 30; i++) {
      let debrisElement: Sprite | null = new Sprite(debris[i % 5]);
      debrisElement = findSpaceForElement(
        debrisElement,
        this.groundBooleanMask,
        230,
        this.containerWidth,
        {
          offsetX: 5,
          offsetY: 50
        }
      );

      if (debrisElement !== null) {
        this.ground.stage.addChild(debrisElement);
      }
    }
  }
}
