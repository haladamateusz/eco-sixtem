import { AfterViewInit, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { Application, Assets, Sprite, TilingSprite } from 'pixi.js';

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

  ngZone = inject(NgZone);

  sky = new Application();

  ground = new Application();

  ngAfterViewInit(): void {
    this.ngZone
      .runOutsideAngular(async (): Promise<void> => {
        await this.renderSkyBackground();
        await this.renderGroundBackground();
        await this.loadClouds();
      })
      .then();
  }

  async renderSkyBackground(): Promise<void> {
    await this.sky.init({
      background: '#1099bb',
      width: this.skyContainer.nativeElement.offsetWidth,
      height: 200
    });

    const skyboxTexture = await Assets.load('assets/skybox.png');
    const skybox: Sprite = new Sprite(skyboxTexture);
    skybox.width = this.skyContainer.nativeElement.offsetWidth;
    this.sky.stage.addChild(skybox);

    this.skyContainer.nativeElement.appendChild(this.sky.canvas);
  }

  async renderGroundBackground(): Promise<void> {
    await this.ground.init({
      background: '#10bb49',
      width: this.groundContainer.nativeElement.offsetWidth,
      height: 300
    });

    const grassTexture = await Assets.load('assets/bck2_2.png');
    const grass: TilingSprite = new TilingSprite({
      scale: 1.8,
      texture: grassTexture,
      width: this.groundContainer.nativeElement.offsetWidth,
      height: 300
    });
    this.ground.stage.addChild(grass);

    this.groundContainer.nativeElement.appendChild(this.ground.canvas);
  }

  async loadClouds(): Promise<void> {
    const cloudTexture = await Assets.load('assets/stage/sky/cloud_healthy.png');
    const cloud: Sprite = new Sprite(cloudTexture);
    cloud.scale = 0.5;
    cloud.x = 30;
    cloud.y = 30;
    this.sky.stage.addChild(cloud);

    let count = 0;
    this.sky.ticker.add(() => {
      count += 0.005;

      cloud.x = 30 + Math.cos(count) * 10;
      cloud.y = 30 + Math.sin(count) * 10;
    });
  }
}
