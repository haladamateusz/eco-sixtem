import { ElementRef, inject, Injectable } from '@angular/core';
import { Application, FederatedPointerEvent, Sprite, Texture, TilingSprite } from 'pixi.js';
import { BooleanMask } from '../../shared/utils/boolean-mask/boolean-mask.class';
import { findSpaceForElement } from '../utils/find-space-for-element.function';
import { AssetsService } from '../assets/assets.service';

@Injectable({
  providedIn: 'root'
})
export class GroundService {
  private ground: Application = new Application();

  private groundBooleanMask!: BooleanMask;

  private containerWidth: number = 0;

  private readonly assetsService: AssetsService = inject(AssetsService);

  async loadGround(groundContainer: ElementRef): Promise<void> {
    this.containerWidth = groundContainer.nativeElement.offsetWidth - 30; // small offset

    await this.ground.init({
      background: '#10bb49',
      width: groundContainer.nativeElement.offsetWidth,
      height: 300
    });

    const groundTexture: Texture = this.assetsService.getTexture('greenGrassTexture2') as Texture;

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
    const treeTexture: Texture = this.assetsService.getTexture('treeHealthy') as Texture;

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
    const sheepTexture: Texture = this.assetsService.getTexture('sheep') as Texture;

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
    const dogTexture: Texture = this.assetsService.getTexture('dog') as Texture;
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
    const rangerTexture: Texture = this.assetsService.getTexture('ranger') as Texture;

    let ranger: Sprite | null = new Sprite(rangerTexture);
    ranger.scale = 0.75;
    ranger.label = 'ranger-1';
    ranger.eventMode = 'static';

    console.log('ranger', ranger.isInteractive());

    ranger.on('click', (event: FederatedPointerEvent) => {
      console.log('Ranger clicked', event.target.label);
    });

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
    plants.push(this.assetsService.getTexture('plant1') as Texture);
    plants.push(this.assetsService.getTexture('plant2') as Texture);
    plants.push(this.assetsService.getTexture('plant3') as Texture);
    plants.push(this.assetsService.getTexture('plant4') as Texture);

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
    rocks.push(this.assetsService.getTexture('rock1') as Texture);
    rocks.push(this.assetsService.getTexture('rock2') as Texture);

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
    debris.push(this.assetsService.getTexture('debris1') as Texture);
    debris.push(this.assetsService.getTexture('debris2') as Texture);
    debris.push(this.assetsService.getTexture('debris3') as Texture);
    debris.push(this.assetsService.getTexture('debris4') as Texture);
    debris.push(this.assetsService.getTexture('debris5') as Texture);

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
