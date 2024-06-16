import { AfterViewInit, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { Application, ContainerChild, Sprite, Texture, Ticker } from 'pixi.js';
import { TextureService } from '../services/texture/texture.service';
import { BooleanMaskService } from '../services/boolean-mask/boolean-mask.service';
import { ElementType } from '../models/element-type.enum';
import { FactorType } from '../models/esg.enum';
import { CaretService } from '../services/caret/caret.service';

@Component({
  selector: 'app-stage',
  standalone: true,
  template: '<div class="d-flex" #container></div>'
})
export class BaseStageComponent implements AfterViewInit {
  @ViewChild('container') protected container!: ElementRef;

  protected height: number = 200;

  protected backgroundColor: string = '#d3d3d3';

  protected backgroundAsset: string = '';

  protected application: Application = new Application();

  protected ngZone: NgZone = inject(NgZone);

  protected ticker: Ticker = new Ticker();

  private readonly booleanMaskService: BooleanMaskService = new BooleanMaskService();

  protected readonly assetsService: TextureService = inject(TextureService);

  protected caretService: CaretService = inject(CaretService);

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
    });
  }

  protected renderBackground(): void {
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

  protected addElements(elementType: ElementType, amount: number, id: string | null = null): void {
    for (let i: number = 0; i < amount; i++) {
      let elementId: string = '';
      if (id !== null) {
        elementId = `${elementType}@${id}`;
      } else {
        const nextElemNumber: number =
          this.application.stage.children.filter((child: ContainerChild) =>
            child.label.includes(elementType)
          ).length + 1;

        elementId = `${elementType}-${nextElemNumber}`;
      }

      let element: Sprite | null = this.elementFactory(elementType, elementId);

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

  protected clearScene(): void {
    if (this.application.stage.children.length > 1) {
      this.application.stage.removeChildren(1);
    }
    this.booleanMaskService.reset();
  }

  badScoreView(): void {}

  goodScoreView(): void {}

  // override this method in child component
  renderElements(factorType: FactorType, score: number, id: string, revenue: number): void {}

  // override this method in child component
  protected elementFactory(elementType: ElementType, id: string): Sprite {
    switch (elementType) {
      default:
        const missingTexture: Texture = this.assetsService.getTexture('missingTexture');
        console.warn('NO TEXTURE SET FOR', elementType.toUpperCase());
        return new Sprite(missingTexture);
    }
  }
}
