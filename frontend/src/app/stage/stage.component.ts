import { AfterViewInit, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { SkyService } from './sky/sky.service';
import { GroundService } from './ground/ground.service';

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

  groundService: GroundService = inject(GroundService);

  ngZone: NgZone = inject(NgZone);

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(async (): Promise<void> => {
      await this.renderGroundBackground();
      await this.renderSky();
    });
  }

  async renderSky(): Promise<void> {
    await this.skyService.loadSky(this.skyContainer);
  }

  async renderGroundBackground(): Promise<void> {
    await this.groundService.loadGround(this.groundContainer);
  }
}
