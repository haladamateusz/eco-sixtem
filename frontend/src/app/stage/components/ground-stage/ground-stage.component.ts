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
import { WolfService } from '../../services/props/wolf/wolf.service';
import { BugService } from '../../services/props/bug/bug.service';
import { ChickenService } from '../../services/props/chicken/chicken.service';
import { FactorType } from '../../models/esg.enum';
import { CaretType } from '../../models/caret-type.enum';

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

  private readonly bugService: BugService = inject(BugService);

  private readonly wolfService: WolfService = inject(WolfService);

  private readonly chickenService: ChickenService = inject(ChickenService);

  protected override backgroundColor: string = '#10bb49';

  protected override backgroundAsset: string = 'greenGrassTexture2';

  protected override height: number = 400;

  protected override renderBackground(): void {
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

  override renderElements(factorType: FactorType, score: number, id: string, revenue: number) {
    switch (factorType) {
      case FactorType.ENVIRONMENTAL:
        if (score > 0.5) {
          this.treeService.changeTreeTextureToHealthy();
          this.addElements(ElementType.TREE, 1, id);
          this.renderCaret(ElementType.TREE, id, revenue);
        } else {
          this.treeService.changeTreeTextureToDead();
          this.addElements(ElementType.TREE, 1, id);
          this.renderCaret(ElementType.TREE, id, revenue);
        }
        break;
      case FactorType.SOCIAL:
        if (score > 0.5) {
          this.addElements(ElementType.SHEEP, 1, id);
          // this.renderCaret(ElementType.SHEEP, id, revenue);
          this.addElements(ElementType.CHICKEN, 1, id);
          // this.renderCaret(ElementType.CHICKEN, id, revenue);
        } else {
          this.addElements(ElementType.WOLF, 1, id);
          // this.renderCaret(ElementType.WOLF, id, revenue);
          this.addElements(ElementType.BUG, 1, id);
          // this.renderCaret(ElementType.BUG, id, revenue);
        }
        break;
      case FactorType.GOVERNANCE:
        if (score > 0.5) {
          this.addElements(ElementType.RANGER, 1, id);
          // this.renderCaret(ElementType.RANGER, id, revenue);
          this.addElements(ElementType.PLANT, 1, id);
          // this.renderCaret(ElementType.PLANT, id, revenue);
        } else {
          this.addElements(ElementType.ROCK, 1, id);
          // this.renderCaret(ElementType.ROCK, id, revenue);
          this.addElements(ElementType.DEBRIS, 1, id);
          // this.renderCaret(ElementType.DEBRIS, id, revenue);
        }
    }
  }

  renderCaret(elementType: ElementType, id: string, revenue: number): void {
    let caret: Sprite | null = null;
    const prop = this.application.stage.getChildByLabel(`${elementType}@${id}`);
    if (prop === null) {
      return;
    }
    const caretTextureIndex: CaretType = this.caretService.getCaretTextureIndex(revenue);
    caret = this.caretService.renderCaret(
      prop.x + prop.width * 0.65,
      prop.y + 10,
      id,
      caretTextureIndex
    );
    caret.eventMode = 'dynamic';
    this.application.stage.addChild(caret);
  }

  protected override elementFactory(elementType: ElementType, id: string): Sprite {
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
      case ElementType.BUG:
        return this.bugService.render(id);
      case ElementType.WOLF:
        return this.wolfService.render(id);
      case ElementType.CHICKEN:
        return this.chickenService.render(id);
      default:
        return super.elementFactory(elementType, id);
    }
  }

  override badScoreView() {
    this.clearScene();

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
    this.addElements(ElementType.WOLF, 5);
    this.addElements(ElementType.BUG, 5);
  }

  override goodScoreView() {
    this.clearScene();

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
    this.addElements(ElementType.CHICKEN, 5);
    this.addElements(ElementType.PLANT, 30);
  }
}
