import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  ViewChild
} from '@angular/core';
import { Application, ContainerChild, Sprite, Texture } from 'pixi.js';
import { AssetsService } from '../../services/assets/assets.service';
import { BooleanMaskService } from '../../services/boolean-mask/boolean-mask.service';
import { CloudService } from '../../services/props/cloud/cloud.service';

@Component({
  selector: 'app-stage',
  standalone: true,
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.scss'
})
export class StageComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;

  @Input() height: number = 0;

  @Input() backgroundColor: string = '#000000';

  @Input() backgroundAsset: string = '';

  private application: Application = new Application();

  ngZone: NgZone = inject(NgZone);

  private readonly booleanMaskService: BooleanMaskService = new BooleanMaskService();

  private readonly assetsService: AssetsService = inject(AssetsService);

  private readonly cloudService: CloudService = inject(CloudService);

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(async (): Promise<void> => {
      await this.application.init({
        background: this.backgroundColor,
        width: this.container.nativeElement.offsetWidth,
        height: this.height
      });

      this.booleanMaskService.initialize(this.application.screen.width, this.height);

      this.addBackground();
      this.addClouds(20);
      this.animateClouds();
    });
  }

  addBackground(): void {
    const backgroundTexture: Texture = this.assetsService.getTexture(
      this.backgroundAsset
    ) as Texture;

    const background: Sprite = new Sprite(backgroundTexture);
    background.width = this.application.screen.width;
    background.height = this.application.screen.height;
    background.label = 'background';

    this.application.stage.addChild(background);
    this.container.nativeElement.appendChild(this.application.canvas);
  }

  // TODO: unify this method
  addClouds(amount: number): void {
    for (let i: number = 0; i < amount; i++) {
      let cloud: Sprite | null = this.cloudService.render();
      const id: number = this.application.stage.children.filter((child: ContainerChild) =>
        child.label.includes('cloud')
      ).length;

      cloud.label = `cloud-${id + 1}`;

      const elementToRender: Sprite | null = this.booleanMaskService.findSpaceForElement(
        cloud,
        this.application.screen.height - 100,
        this.application.screen.width - 50,
        {
          offsetX: 5,
          offsetY: 5
        }
      );

      if (elementToRender !== null) {
        this.application.stage.addChild(elementToRender);
      }
    }
  }

  private animateClouds(): void {
    console.log(this.application.stage.children);
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
