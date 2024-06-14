import { AfterViewInit, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { Application, ContainerChild, Sprite, Texture } from 'pixi.js';
import { TextureService } from '../services/texture/texture.service';
import { BooleanMaskService } from '../services/boolean-mask/boolean-mask.service';
import { ElementType } from '../models/element-type.enum';

@Component({
  selector: 'app-stage',
  standalone: true,
  template: '<div class="d-flex" #container></div>'
})
export class BaseStageComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;

  height: number = 200;

  backgroundColor: string = '#d3d3d3';

  backgroundAsset: string = '';

  protected application: Application = new Application();

  ngZone: NgZone = inject(NgZone);

  private readonly booleanMaskService: BooleanMaskService = new BooleanMaskService();

  protected readonly assetsService: TextureService = inject(TextureService);

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(async (): Promise<void> => {
      await this.application.init({
        background: this.backgroundColor,
        width: this.container.nativeElement.offsetWidth,
        height: this.height
      });

      this.booleanMaskService.initialize(
        this.application.screen.width,
        this.application.screen.height
      );

      this.renderBackground();
      this.renderElements();
    });
  }

  renderBackground(): void {
    if (!this.backgroundAsset) {
      this.container.nativeElement.appendChild(this.application.canvas);
      return;
    }

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

  // We iterate from 1 due to id starting from 1
  addElements(elementType: ElementType, amount: number): void {
    for (let i: number = 1; i < amount + 1; i++) {
      const id: number =
        this.application.stage.children.filter((child: ContainerChild) =>
          child.label.includes(elementType)
        ).length + 1;

      let element: Sprite | null = this.elementFactory(elementType, id);

      const elementToRender: Sprite | null = this.booleanMaskService.findSpaceForElement(
        element,
        this.application.screen.height - element.height,
        this.application.screen.width - element.width
      );

      if (elementToRender !== null) {
        this.application.stage.addChild(elementToRender);
      }
    }
  }

  clearScene(): void {
    this.application.stage.removeChildren(1);
    this.booleanMaskService.reset();
  }

  badScoreView(): void {}

  goodScoreView(): void {}

  // override this method in child component
  renderElements(): void {}

  // override this method in child component
  elementFactory(elementType: ElementType, id: number): Sprite {
    switch (elementType) {
      default:
        const missingTexture: Texture = this.assetsService.getTexture('missingTexture');
        console.warn('NO TEXTURE SET FOR', elementType.toUpperCase());
        return new Sprite(missingTexture);
    }
  }
}
