import { Component, inject } from '@angular/core';
import { BaseStageComponent } from '../base-stage.component';
import { CloudService } from '../../services/props/cloud/cloud.service';
import { ElementType } from '../../models/element-type.enum';
import { ContainerChild, Sprite } from 'pixi.js';

@Component({
  selector: 'app-sky-stage',
  standalone: true,
  template: '<div class="d-flex" #container></div>'
})
export class SkyStageComponent extends BaseStageComponent {
  private readonly cloudService: CloudService = inject(CloudService);

  override height: number = 200;

  override backgroundColor: string = '#1099bb';

  override backgroundAsset: string = 'skyboxTexture';

  override renderElements(): void {
    this.addElements(ElementType.CLOUD, 10);
    this.animateClouds();
  }

  override elementFactory(elementType: ElementType, id: number): Sprite {
    switch (elementType) {
      case ElementType.CLOUD:
        return this.cloudService.render(id);
      default:
        return super.elementFactory(elementType, id);
    }
  }

  override badScoreView() {
    this.clearScene();
    this.cloudService.changeTextureToPolluted();
    this.addElements(ElementType.CLOUD, 10);
    this.animateClouds();
  }

  override goodScoreView() {
    this.clearScene();
    this.cloudService.changeTextureToHealthy();
    this.addElements(ElementType.CLOUD, 10);
    this.animateClouds();
  }

  private animateClouds(): void {
    let count: number = 0;
    const clouds: Sprite[] = this.application.stage.children.filter((child: ContainerChild) =>
      child.label.includes('cloud')
    ) as Sprite[];

    this.application.ticker.add(() => {
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
