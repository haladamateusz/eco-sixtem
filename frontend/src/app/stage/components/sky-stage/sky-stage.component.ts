import { Component, inject } from '@angular/core';
import { BaseStageComponent } from '../base-stage.component';
import { CloudService } from '../../services/props/cloud/cloud.service';
import { ElementType } from '../../models/element-type.enum';
import { ContainerChild, Sprite, Texture, Ticker } from 'pixi.js';
import { FactorType } from '../../models/esg.enum';
import { CaretType } from '../../models/caret-type.enum';

@Component({
  selector: 'app-sky-stage',
  standalone: true,
  template: '<div class="d-flex" #container></div>'
})
export class SkyStageComponent extends BaseStageComponent {
  private readonly cloudService: CloudService = inject(CloudService);

  protected override height: number = 200;

  protected override backgroundColor: string = '#1099bb';

  protected override backgroundAsset: string = 'skyboxTexture';

  override renderElements(
    factorType: FactorType,
    score: number,
    id: string,
    revenue: number
  ): void {
    switch (factorType) {
      case FactorType.ENVIRONMENTAL:
        if (score > 0.5) {
          this.cloudService.changeTextureToHealthy();
          this.addElements(ElementType.CLOUD, 1, id);
          // this.renderCaret(ElementType.CLOUD, id, revenue);
        } else {
          this.cloudService.changeTextureToPolluted();
          this.addElements(ElementType.CLOUD, 1, id);
          // this.renderCaret(ElementType.CLOUD, id, revenue);
        }
        this.animateClouds();
        break;
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
      case ElementType.CLOUD:
        return this.cloudService.render(id);
      default:
        return super.elementFactory(elementType, id);
    }
  }

  override badScoreView() {
    this.clearScene();

    this.backgroundAsset = 'skyboxPollutedTexture';

    const backgroundTexture: Texture = this.assetsService.getTexture(
      this.backgroundAsset
    ) as Texture;

    const background: Sprite = new Sprite(backgroundTexture);
    background.width = this.application.screen.width;
    background.height = this.application.screen.height;
    background.label = 'background';

    this.application.stage.addChildAt(background, 0);
    this.application.stage.removeChildAt(1);

    this.cloudService.changeTextureToPolluted();
    this.addElements(ElementType.CLOUD, 10);
    this.animateClouds();
  }

  override goodScoreView() {
    this.clearScene();

    this.backgroundAsset = 'skyboxTexture';

    const backgroundTexture: Texture = this.assetsService.getTexture(
      this.backgroundAsset
    ) as Texture;

    const background: Sprite = new Sprite(backgroundTexture);
    background.width = this.application.screen.width;
    background.height = this.application.screen.height;
    background.label = 'background';

    this.application.stage.addChildAt(background, 0);
    this.application.stage.removeChildAt(1);

    this.cloudService.changeTextureToHealthy();
    this.addElements(ElementType.CLOUD, 10);
    this.animateClouds();
  }

  private animateClouds(): void {
    this.ticker.destroy();
    this.ticker = new Ticker();
    this.ticker.start();

    let count: number = 0;

    const clouds: Sprite[] = this.application.stage.children.filter((child: ContainerChild) =>
      child.label.includes('cloud')
    ) as Sprite[];

    // const carets: Sprite[] = this.application.stage.children.filter((child: ContainerChild) => {
    //   return child.label.includes('caret');
    // }) as Sprite[];

    this.ticker.add(() => {
      count += 0.01;

      clouds.forEach((cloud: Sprite, index: number): void => {
        const cloudId = cloud.label.split('@')[1];
        // const caret: Sprite = carets.find((c: Sprite) => c.label.includes(cloudId))!;

        if (index % 8 === 0) {
          cloud.x = cloud.x + Math.cos(count) * 0.04;
          cloud.y = cloud.y + Math.sin(count) * 0.04;
          // caret.x = cloud.x + cloud.width * 0.65 + Math.cos(count) * 0.04;
          // caret.y = cloud.y + Math.sin(count) * 0.04;
        } else if (index % 8 === 1) {
          cloud.x = cloud.x - Math.cos(count) * 0.02;
          cloud.y = cloud.y - Math.sin(count) * 0.02;
          // caret.x = cloud.x + cloud.width * 0.65 - Math.cos(count) * 0.02;
          // caret.y = cloud.y - Math.sin(count) * 0.02;
        } else if (index % 8 === 2) {
          cloud.x = cloud.x + Math.cos(count) * 0.06;
          cloud.y = cloud.y - Math.sin(count) * 0.06;
          // caret.x = cloud.x + cloud.width * 0.65 + Math.cos(count) * 0.06;
          // caret.y = cloud.y - Math.sin(count) * 0.06;
        } else if (index % 8 === 3) {
          cloud.x = cloud.x - Math.cos(count) * 0.04;
          cloud.y = cloud.y + Math.sin(count) * 0.04;
          // caret.x = cloud.x + cloud.width * 0.65 - Math.cos(count) * 0.04;
          // caret.y = cloud.y + Math.sin(count) * 0.04;
        } else if (index % 8 === 4) {
          cloud.x = cloud.x + Math.sin(count) * 0.06;
          cloud.y = cloud.y + Math.cos(count) * 0.06;
          // caret.x = cloud.x + cloud.width * 0.65 + Math.sin(count) * 0.06;
          // caret.y = cloud.y + Math.cos(count) * 0.06;
        } else if (index % 8 === 5) {
          cloud.x = cloud.x - Math.sin(count) * 0.08;
          cloud.y = cloud.y - Math.cos(count) * 0.08;
          // caret.x = cloud.x + cloud.width * 0.65 - Math.sin(count) * 0.08;
          // caret.y = cloud.y - Math.cos(count) * 0.08;
        } else if (index % 8 === 6) {
          cloud.x = cloud.x + Math.sin(count) * 0.04;
          cloud.y = cloud.y - Math.cos(count) * 0.04;
          // caret.x = cloud.x + cloud.width * 0.65 + Math.sin(count) * 0.04;
          // caret.y = cloud.y - Math.cos(count) * 0.04;
        } else if (index % 8 === 7) {
          cloud.x = cloud.x - Math.sin(count) * 0.03;
          cloud.y = cloud.y + Math.cos(count) * 0.03;
          // caret.x = cloud.x + cloud.width * 0.65 - Math.sin(count) * 0.03;
          // caret.y = cloud.y + Math.cos(count) * 0.03;
        }
      });
    });
  }
}
