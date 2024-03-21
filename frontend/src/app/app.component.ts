import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';

interface Cloud {
  posX: number;
  posY: number;
  polluted: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  cdr = inject(ChangeDetectorRef);

  title = 'eco-sixtem';

  isFirstVisit = true;

  dialog = inject(MatDialog);

  cloudsData: Cloud[] = [
    { posX: 30, posY: 30, polluted: true },
    { posX: 100, posY: 100, polluted: true },
    { posX: 100, posY: 200, polluted: true },
    { posX: 50, posY: 400, polluted: true },
    { posX: 80, posY: 500, polluted: true },
    { posX: 60, posY: 600, polluted: false },
    { posX: 40, posY: 800, polluted: false },
    { posX: 50, posY: 1100, polluted: false },
    { posX: 80, posY: 1200, polluted: false },
    { posX: 20, posY: 1300, polluted: false },
    { posX: 30, posY: 1400, polluted: false },
  ];
  @ViewChild('clouds', { static: true }) clouds!: ElementRef;
  @ViewChild('sky', { static: true }) sky!: ElementRef;

  ngOnInit() {
    // if (!localStorage.getItem('isFirstVisit')) {
    //   localStorage.setItem('siteVisited', 'true');
    //   this.dialog.open(ModalWrapperComponent, {
    //     minWidth: 600,
    //     maxWidth: 600,
    //     minHeight: 300,
    //   });
    // }
  }

  ngAfterViewInit() {
    this.sky.nativeElement.width = window.innerWidth - 4;
    this.sky.nativeElement.height = window.innerHeight - 15;

    this.clouds.nativeElement.width = window.innerWidth - 4;
    this.clouds.nativeElement.height = window.innerHeight - 15;

    this.drawSky();
    this.drawClouds();
    this.cdr.detectChanges();
  }

  drawSky(): void {
    const canvas = this.sky.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'deepskyblue';
      ctx.fillRect(0, 0, canvas.width, 200);
    }
  }

  drawClouds(): void {
    const happyCloud = new Image();
    happyCloud.src = '../assets/happy_cloud.png';

    const pollutedCloud = new Image();
    pollutedCloud.src = '../assets/sad_cloud.png';

    const canvas = this.clouds.nativeElement;
    const ctx = canvas.getContext('2d');

    Promise.all([ () => {
      return () => {
        happyCloud.height = 80;
        happyCloud.width = 80;
        happyCloud.onload = () => {
          Promise.resolve(happyCloud);
        }
      }},
      () => {
        return () => {
          pollutedCloud.height = 80;
          pollutedCloud.width = 80;
          pollutedCloud.onload = () => {
            Promise.resolve(pollutedCloud);
          }
        }}]).then(() => {

      setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.cloudsData.forEach((cloud) => {
          const offsetX = Math.floor(Math.random() * 15) + 1
          const offsetY = Math.floor(Math.random() * 15) + 1
          ctx.drawImage(cloud.polluted ? pollutedCloud : happyCloud, 0, 0, 339, 339, cloud.posY + offsetY,
            cloud.posX + offsetX, 50, 50);
        });
      }, 500);
})



  }
}
