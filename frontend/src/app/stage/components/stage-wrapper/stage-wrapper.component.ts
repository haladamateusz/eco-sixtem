import { Component } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { StageComponent } from '../stage/stage.component';

@Component({
  selector: 'app-stage-wrapper',
  standalone: true,
  imports: [AsyncPipe, MatMenu, MatMenuTrigger, StageComponent],
  templateUrl: './stage-wrapper.component.html',
  styleUrl: './stage-wrapper.component.scss'
})
export class StageWrapperComponent {
  // @ViewChild('container') skyContainer!: ElementRef;
  //
  // // @ViewChild('groundContainer') groundContainer!: ElementRef;
  //
  // @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  //
  // private readonly skyService: SkyService = inject(SkyService);
  //
  // private readonly groundService: GroundService = inject(GroundService);
  //
  // ngZone: NgZone = inject(NgZone);
  // ngAfterViewInit(): void {
  //   this.ngZone.runOutsideAngular(async (): Promise<void> => {
  //     await this.renderGroundBackground();
  //     await this.renderSky();
  //   });
  // }
  // async renderSky(): Promise<void> {
  //   await this.skyService.loadSky(this.skyContainer);
  // }
  //
  // async renderGroundBackground(): Promise<void> {
  //   await this.groundService.loadGround(this.groundContainer);
  // }
}
