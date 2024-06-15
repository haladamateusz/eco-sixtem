import { Component, inject } from '@angular/core';
import { BaseStageComponent } from '../base-stage.component';
import { Sprite, Texture, TilingSprite } from 'pixi.js';
import { ElementType } from '../../models/element-type.enum';
import { TreeService } from '../../services/props/tree/tree.service';
import { SheepService } from '../../services/props/sheep/sheep.service';
import { RockService } from '../../services/props/rock/rock.service';
import { RangerService } from '../../services/props/ranger/ranger.service';
import { PlantService } from '../../services/props/plant/plant.service';
import { DebrisService } from '../../services/props/debris/debris.service';
import { DogService } from '../../services/props/dog/dog.service';

@Component({
  selector: 'app-ground-stage',
  standalone: true,
  template: '<div class="d-flex" #container></div>'
})
export class GroundStageComponent extends BaseStageComponent {
  private readonly treeService: TreeService = inject(TreeService);

  private readonly sheepService: SheepService = inject(SheepService);

  private readonly rockService: RockService = inject(RockService);

  private readonly rangerService: RangerService = inject(RangerService);

  private readonly plantService: PlantService = inject(PlantService);

  private readonly debrisService: DebrisService = inject(DebrisService);

  private readonly dogService: DogService = inject(DogService);

  override backgroundColor: string = '#10bb49';

  override backgroundAsset: string = 'greenGrassTexture2';

  override height: number = 400;

  override renderBackground(): void {
    const backgroundTexture: Texture = this.assetsService.getTexture(
      this.backgroundAsset
    ) as Texture;

    const background: TilingSprite = new TilingSprite({
      texture: backgroundTexture,
      width: this.application.screen.width * 2,
      height: this.application.screen.height * 2,
      scale: 0.5
    });

    this.application.stage.addChild(background);
    this.container.nativeElement.appendChild(this.application.canvas);
  }

  override renderElements() {
    // this.addElements(ElementType.TREE, 30);
    // this.addElements(ElementType.SHEEP, 5);
    // this.addElements(ElementType.RANGER, 1);
    // this.addElements(ElementType.DOG, 1);
    // this.addElements(ElementType.PLANT, 30);
    // this.addElements(ElementType.DEBRIS, 20);
  }

  override elementFactory(elementType: ElementType, id: string): Sprite {
    switch (elementType) {
      case ElementType.TREE:
        return this.treeService.render(id);
      case ElementType.SHEEP:
        return this.sheepService.render(id);
      case ElementType.ROCK:
        return this.rockService.render(id);
      case ElementType.RANGER:
        return this.rangerService.render(id);
      case ElementType.PLANT:
        return this.plantService.render(id);
      case ElementType.DEBRIS:
        return this.debrisService.render(id);
      case ElementType.DOG:
        return this.dogService.render(id);
      default:
        return super.elementFactory(elementType, id);
    }
  }

  override badScoreView() {
    this.clearScene();

    this.application.stage.getChildAt(0);

    this.backgroundAsset = 'desertTexture';

    const backgroundTexture: Texture = this.assetsService.getTexture(
      this.backgroundAsset
    ) as Texture;

    const background: TilingSprite = new TilingSprite({
      texture: backgroundTexture,
      width: this.application.screen.width,
      height: this.application.screen.height
    });

    this.application.stage.addChildAt(background, 0);
    this.application.stage.removeChildAt(1);

    this.treeService.changeTreeTextureToDead();
    this.addElements(ElementType.TREE, 20);
    this.addElements(ElementType.ROCK, 15);
  }

  override goodScoreView() {
    this.clearScene();

    this.application.stage.getChildAt(0);

    this.backgroundAsset = 'greenGrassTexture2';

    const backgroundTexture: Texture = this.assetsService.getTexture(
      this.backgroundAsset
    ) as Texture;

    const background: TilingSprite = new TilingSprite({
      texture: backgroundTexture,
      width: this.application.screen.width * 2,
      height: this.application.screen.height * 2,
      scale: 0.5
    });

    this.application.stage.addChildAt(background, 0);
    this.application.stage.removeChildAt(1);

    this.treeService.changeTreeTextureToHealthy();
    this.addElements(ElementType.TREE, 30);
    this.addElements(ElementType.SHEEP, 5);
    this.addElements(ElementType.RANGER, 1);
    this.addElements(ElementType.DOG, 1);
    this.addElements(ElementType.PLANT, 30);
  }
}
