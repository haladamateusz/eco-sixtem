import { AfterViewInit, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { Application, Assets, Texture, TilingSprite } from 'pixi.js';
import { SkyService } from './sky/service/sky.service';

@Component({
  selector: 'app-stage',
  standalone: true,
  imports: [],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.scss'
})
export class StageComponent implements AfterViewInit {
  @ViewChild('skyContainer') skyContainer!: ElementRef;

  @ViewChild('groundContainer') groundContainer!: ElementRef;

  skyService: SkyService = inject(SkyService);

  ngZone: NgZone = inject(NgZone);

  ground = new Application();

  ngAfterViewInit(): void {
    this.ngZone
      .runOutsideAngular(async (): Promise<void> => {
        await this.renderGroundBackground();
        await this.renderSky();
      })
      .then();
  }

  async renderSky(): Promise<void> {
    await this.skyService.loadSky(this.skyContainer);
  }

  async renderGroundBackground(): Promise<void> {
    await this.ground.init({
      background: '#10bb49',
      width: this.groundContainer.nativeElement.offsetWidth,
      height: 300
    });

    const grassTexture: Texture = await Assets.load('assets/bck2_2.png');
    const grass: TilingSprite = new TilingSprite({
      scale: 1.8,
      texture: grassTexture,
      width: this.groundContainer.nativeElement.offsetWidth,
      height: 300
    });
    this.ground.stage.addChild(grass);

    this.groundContainer.nativeElement.appendChild(this.ground.canvas);
  }
}
