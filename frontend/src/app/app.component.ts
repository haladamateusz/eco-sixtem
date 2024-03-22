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
import { HoverButtonComponent } from './hover-button/hover-button.component';
import { InfographicComponent } from './infographic/infographic.component';
import { HoverInfoComponent } from './hover-info/hover-info.component';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import { PlantSapplingComponent } from './plant-sappling/plant-sappling.component';
import { first, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import { LimitedCharactersPipe } from './limited-characters.pipe';

interface Cloud {
  posX: number;
  posY: number;
  polluted: boolean;
}

interface Tree {
  posX: number;
  posY: number;
  state: 'dead' | 'dying' | 'healthy';
}

interface Animal {
  posX: number;
  posY: number;
  animalType: string;
  dead: boolean;
}

interface EsgFactors {
  environmental: number;
  social: number;
  governance: number;
}

interface LoadedCompany {
  companyName: string;
  revenue: number;
  environmental: number;
  social: number;
  governance: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  imports: [
    HoverButtonComponent,
    InfographicComponent,
    HoverInfoComponent,
    NgForOf,
    LimitedCharactersPipe,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  environmental = '0';
  social = '0';
  governance = '0';
  revenue = '0';

  loadedCompanies: LoadedCompany[] = [];

  cdr = inject(ChangeDetectorRef);

  httpClient = inject(HttpClient);

  title = 'eco-sixtem';

  isFirstVisit = true;

  dialog = inject(MatDialog);

  cloudDataBase: Cloud[] = [
    { posY: 30, posX: 30, polluted: true },
    { posY: 100, posX: 100, polluted: true },
    { posY: 100, posX: 200, polluted: true },
    { posY: 50, posX: 400, polluted: true },
    { posY: 80, posX: 500, polluted: true },
    { posY: 60, posX: 600, polluted: true },
    { posY: 40, posX: 800, polluted: true },
    { posY: 50, posX: 1100, polluted: true },
    { posY: 80, posX: 1200, polluted: true },
    { posY: 20, posX: 1300, polluted: true },
    { posY: 30, posX: 1400, polluted: true },
  ];

  cloudsData: Cloud[] = [];

  treesDatabase: Tree[] = [
    {
      posY: Math.floor(Math.random() * 65) + 30,
      posX: Math.floor(Math.random() * 35) + 30,
      state: 'healthy',
    },
    // {
    //   posY: Math.floor(Math.random() * 65) + 100,
    //   posX: Math.floor(Math.random() * 35) + 100,
    //   state: 'healthy',
    // },
    // {
    //   posY: Math.floor(Math.random() * 65) + 100,
    //   posX: Math.floor(Math.random() * 35) + 200,
    //   state: 'healthy',
    // },
    {
      posY: Math.floor(Math.random() * 65) + 50,
      posX: Math.floor(Math.random() * 65) + 400,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 80,
      posX: Math.floor(Math.random() * 65) + 500,
      state: 'healthy',
    },
    // {
    //   posY: Math.floor(Math.random() * 65) + 60,
    //   posX: Math.floor(Math.random() * 65) + 600,
    //   state: 'healthy',
    // },
    // {
    //   posY: Math.floor(Math.random() * 65) + 40,
    //   posX: Math.floor(Math.random() * 65) + 800,
    //   state: 'healthy',
    // },
    {
      posY: Math.floor(Math.random() * 65) + 50,
      posX: Math.floor(Math.random() * 65) + 1100,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 80,
      posX: Math.floor(Math.random() * 65) + 777,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 20,
      posX: Math.floor(Math.random() * 65) + 342,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 35) + 30,
      posX: Math.floor(Math.random() * 65) + 675,
      state: 'healthy',
    },
    // {
    //   posY: Math.floor(Math.random() * 35) + 130,
    //   posX: Math.floor(Math.random() * 35) + 30,
    //   state: 'healthy',
    // },
    // {
    //   posY: Math.floor(Math.random() * 65) + 200,
    //   posX: Math.floor(Math.random() * 35) + 100,
    //   state: 'healthy',
    // },
    {
      posY: Math.floor(Math.random() * 65) + 200,
      posX: Math.floor(Math.random() * 65) + 200,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 150,
      posX: Math.floor(Math.random() * 65) + 400,
      state: 'dead',
    },
    {
      posY: Math.floor(Math.random() * 65) + 180,
      posX: Math.floor(Math.random() * 65) + 500,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 160,
      posX: Math.floor(Math.random() * 65) + 600,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 140,
      posX: Math.floor(Math.random() * 65) + 800,
      state: 'dead',
    },
    // {
    //   posY: Math.floor(Math.random() * 65) + 150,
    //   posX: Math.floor(Math.random() * 65) + 1100,
    //   state: 'dying',
    // },
    // {
    //   posY: Math.floor(Math.random() * 65) + 180,
    //   posX: Math.floor(Math.random() * 65) + 1200,
    //   state: 'dead',
    // },
    {
      posY: Math.floor(Math.random() * 65) + 120,
      posX: Math.floor(Math.random() * 65) + 543,
      state: 'dead',
    },
    {
      posY: Math.floor(Math.random() * 65) + 130,
      posX: Math.floor(Math.random() * 65) + 345,
      state: 'dying',
    },
    {
      posY: Math.floor(Math.random() * 65) + 230,
      posX: Math.floor(Math.random() * 65) + 30,
      state: 'healthy',
    },
    // {
    //   posY: Math.floor(Math.random() * 65) + 300,
    //   posX: Math.floor(Math.random() * 65) + 100,
    //   state: 'dying',
    // },
    // {
    //   posY: Math.floor(Math.random() * 65) + 300,
    //   posX: Math.floor(Math.random() * 65) + 200,
    //   state: 'healthy',
    // },
    {
      posY: Math.floor(Math.random() * 65) + 250,
      posX: Math.floor(Math.random() * 65) + 400,
      state: 'dying',
    },
    {
      posY: Math.floor(Math.random() * 65) + 280,
      posX: Math.floor(Math.random() * 65) + 500,
      state: 'dying',
    },
    {
      posY: Math.floor(Math.random() * 65) + 260,
      posX: Math.floor(Math.random() * 65) + 600,
      state: 'dying',
    },
    {
      posY: Math.floor(Math.random() * 65) + 240,
      posX: Math.floor(Math.random() * 65) + 800,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 250,
      posX: Math.floor(Math.random() * 65) + 1100,
      state: 'dying',
    },
    // {
    //   posY: Math.floor(Math.random() * 65) + 280,
    //   posX: Math.floor(Math.random() * 65) + 1200,
    //   state: 'healthy',
    // },
    // {
    //   posY: Math.floor(Math.random() * 65) + 220,
    //   posX: Math.floor(Math.random() * 65) + 1300,
    //   state: 'dying',
    // },
    {
      posY: Math.floor(Math.random() * 65) + 230,
      posX: Math.floor(Math.random() * 65) + 1400,
      state: 'dead',
    },
  ];

  treesData: Tree[] = []

  animalsDatabase: Animal[] =[
    {
      posY: Math.floor(Math.random() * 65) + 30,
      posX: Math.floor(Math.random() * 35) + 30,
      dead: true,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 100,
      posX: Math.floor(Math.random() * 35) + 100,
      dead: true,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 100,
      posX: Math.floor(Math.random() * 35) + 200,
      dead: true,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 50,
      posX: Math.floor(Math.random() * 65) + 400,
      dead: true,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 80,
      posX: Math.floor(Math.random() * 65) + 500,
      dead: true,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 60,
      posX: Math.floor(Math.random() * 65) + 600,
      dead: false,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 40,
      posX: Math.floor(Math.random() * 65) + 800,
      dead: false,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 50,
      posX: Math.floor(Math.random() * 65) + 1100,
      dead: false,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 80,
      posX: Math.floor(Math.random() * 65) + 456,
      dead: false,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 20,
      posX: Math.floor(Math.random() * 65) + 347,
      dead: false,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 30,
      posX: Math.floor(Math.random() * 65) + 1400,
      dead: false,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 130,
      posX: Math.floor(Math.random() * 65) + 30,
      dead: true,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 200,
      posX: Math.floor(Math.random() * 65) + 100,
      dead: true,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 200,
      posX: Math.floor(Math.random() * 65) + 200,
      dead: true,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 150,
      posX: Math.floor(Math.random() * 65) + 400,
      dead: true,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 180,
      posX: Math.floor(Math.random() * 65) + 500,
      dead: true,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 160,
      posX: Math.floor(Math.random() * 65) + 600,
      dead: false,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 140,
      posX: Math.floor(Math.random() * 65) + 800,
      dead: false,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 150,
      posX: Math.floor(Math.random() * 65) + 1100,
      dead: false,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 180,
      posX: Math.floor(Math.random() * 65) + 1200,
      dead: false,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 120,
      posX: Math.floor(Math.random() * 65) + 834,
      dead: false,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 130,
      posX: Math.floor(Math.random() * 65) + 934,
      dead: false,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 230,
      posX: Math.floor(Math.random() * 65) + 30,
      dead: true,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 300,
      posX: Math.floor(Math.random() * 65) + 100,
      dead: true,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 300,
      posX: Math.floor(Math.random() * 65) + 200,
      dead: true,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 250,
      posX: Math.floor(Math.random() * 65) + 400,
      dead: true,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 280,
      posX: Math.floor(Math.random() * 65) + 500,
      dead: true,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 260,
      posX: Math.floor(Math.random() * 65) + 600,
      dead: false,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 240,
      posX: Math.floor(Math.random() * 65) + 800,
      dead: false,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 250,
      posX: Math.floor(Math.random() * 65) + 1100,
      dead: false,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 280,
      posX: Math.floor(Math.random() * 65) + 1200,
      dead: false,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 220,
      posX: Math.floor(Math.random() * 65) + 1050,
      dead: false,
      animalType: 'sheep',
    },
    {
      posY: Math.floor(Math.random() * 65) + 230,
      posX: Math.floor(Math.random() * 65) + 1200,
      dead: false,
      animalType: 'sheep',
    },
  ];

  animalsData: Animal[] = []

  @ViewChild('clouds', { static: true }) clouds!: ElementRef;

  @ViewChild('sky', { static: true }) sky!: ElementRef;

  @ViewChild('terrain', { static: true }) terrain!: ElementRef;

  @ViewChild('trees', { static: true }) trees!: ElementRef;

  @ViewChild('animals', { static: true }) animals!: ElementRef;

  @ViewChild('debris', { static: true }) debris!: ElementRef;

  ngOnInit() {
    if (!localStorage.getItem('isFirstVisit')) {
      localStorage.setItem('siteVisited', 'true');
      this.dialog.open(ModalWrapperComponent, {
        minWidth: 600,
        maxWidth: 600,
        minHeight: 300,
      });
    }
  }

  ngAfterViewInit() {
    this.sky.nativeElement.width = window.innerWidth - 447;
    this.sky.nativeElement.height = window.innerHeight - 215;

    this.clouds.nativeElement.width = window.innerWidth - 447;
    this.clouds.nativeElement.height = window.innerHeight - 215;

    this.terrain.nativeElement.width = window.innerWidth - 447;
    this.terrain.nativeElement.height = window.innerHeight - 215;

    this.trees.nativeElement.width = window.innerWidth - 447;
    this.trees.nativeElement.height = window.innerHeight - 215;

    this.animals.nativeElement.width = window.innerWidth - 447;
    this.animals.nativeElement.height = window.innerHeight - 215;

    this.debris.nativeElement.width = window.innerWidth - 447;
    this.debris.nativeElement.height = window.innerHeight - 215;

    this.drawSky();
    // this.drawClouds();
    this.drawTerrain();
    // this.drawTrees();
    // this.drawAnimals();
    this.cdr.detectChanges();
  }

  drawSky(): void {
    const sky = new Image();
    sky.src = '../assets/skybox.png';
    const canvas = this.sky.nativeElement;
    const ctx = canvas.getContext('2d');

    sky.onload = () => {
      ctx.drawImage(sky, 0, 0, canvas.width, canvas.height);
    };
  }

  drawClouds(): void {
    const happyCloud = new Image();
    happyCloud.src = '../assets/cloud_healthy.png';

    const pollutedCloud = new Image();
    pollutedCloud.src = '../assets/cloud_polluted.png';

    const canvas = this.clouds.nativeElement;
    const ctx = canvas.getContext('2d');

    Promise.all([
      () => {
        return () => {
          happyCloud.height = 102;
          happyCloud.width = 172;
          happyCloud.onload = () => {
            Promise.resolve(happyCloud);
          };
        };
      },
      () => {
        return () => {
          pollutedCloud.height = 102;
          pollutedCloud.width = 172;
          pollutedCloud.onload = () => {
            Promise.resolve(pollutedCloud);
          };
        };
      },
    ]).then(() => {
      setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.cloudsData.forEach((cloud) => {
          const offsetX = Math.floor(Math.random() * 15) + 1;
          const offsetY = Math.floor(Math.random() * 15) + 1;
          ctx.drawImage(
            cloud.polluted ? pollutedCloud : happyCloud,
            0,
            0,
            172,
            102,
            cloud.posX + offsetX,
            cloud.posY + offsetY,
            172 / 2,
            102 / 2,
          );
        });
      }, 300);
    });
  }

  drawTerrain() {
    const grass = new Image();
    grass.src = '../assets/bck2_2.png';
    const canvas = this.terrain.nativeElement;
    const ctx = canvas.getContext('2d');

    grass.onload = () => {
      var pat = ctx.createPattern(grass, 'repeat');
      ctx.fillStyle = pat;
      ctx.rect(0, 200, canvas.width, 700);
      ctx.fill();
    };
  }

  first = 0;

  drawTrees() {
    const happyTree1 = new Image();
    happyTree1.src = '../assets/tree3_1up.png';

    const happyTree2 = new Image();
    happyTree2.src = '../assets/tree3_2up.png';

    const happyTree3 = new Image();
    happyTree3.src = '../assets/tree3_3up.png';

    const happyTree4 = new Image();
    happyTree4.src = '../assets/tree3_1down.png';

    const happyTree5 = new Image();
    happyTree5.src = '../assets/tree3_2down.png';

    const happyTree6 = new Image();
    happyTree6.src = '../assets/tree3_3down.png';

    const dyingTree1 = new Image();
    dyingTree1.src = '../assets/tree2_1up.png';

    const dyingTree2 = new Image();
    dyingTree2.src = '../assets/tree2_1up.png';

    const dyingTree3 = new Image();
    dyingTree3.src = '../assets/tree2_1up.png';

    const dyingTree4 = new Image();
    dyingTree4.src = '../assets/tree2_1up.png';

    const dyingTree5 = new Image();
    dyingTree5.src = '../assets/tree2_1up.png';

    const dyingTree6 = new Image();
    dyingTree6.src = '../assets/tree2_1up.png';

    const deadTree1 = new Image();
    deadTree1.src = '../assets/tree1_1up.png';

    const deadTree2 = new Image();
    deadTree2.src = '../assets/tree1_2up.png';

    const deadTree3 = new Image();
    deadTree3.src = '../assets/tree1_3up.png';

    const deadTree4 = new Image();
    deadTree4.src = '../assets/tree1_1down.png';

    const deadTree5 = new Image();
    deadTree5.src = '../assets/tree1_2down.png';

    const deadTree6 = new Image();
    deadTree6.src = '../assets/tree1_3down.png';

    const canvas = this.trees.nativeElement;
    const ctx = canvas.getContext('2d');

    Promise.all([
      () => {
        return () => {
          happyTree1.height = 170;
          happyTree1.width = 142;
          happyTree1.onload = () => {
            Promise.resolve(happyTree1);
          };
        };
      },
      () => {
        return () => {
          happyTree2.height = 170;

          deadTree5.width = 142;
          happyTree2.onload = () => {
            Promise.resolve(happyTree2);
          };
        };
      },
      () => {
        return () => {
          happyTree3.height = 170;
          happyTree3.width = 142;
          happyTree3.onload = () => {
            Promise.resolve(happyTree3);
          };
        };
      },
      () => {
        return () => {
          happyTree4.height = 170;
          happyTree4.width = 142;
          happyTree4.onload = () => {
            Promise.resolve(happyTree4);
          };
        };
      },
      () => {
        return () => {
          happyTree5.height = 170;

          deadTree5.width = 142;
          happyTree5.onload = () => {
            Promise.resolve(happyTree5);
          };
        };
      },
      () => {
        return () => {
          happyTree6.height = 170;

          deadTree5.width = 142;
          happyTree6.onload = () => {
            Promise.resolve(happyTree6);
          };
        };
      },
      // dying tree
      () => {
        return () => {
          dyingTree1.height = 170;

          deadTree5.width = 142;
          dyingTree1.onload = () => {
            Promise.resolve(dyingTree1);
          };
        };
      },
      () => {
        return () => {
          dyingTree2.height = 170;

          deadTree5.width = 142;
          dyingTree2.onload = () => {
            Promise.resolve(dyingTree2);
          };
        };
      },
      () => {
        return () => {
          dyingTree3.height = 170;

          deadTree5.width = 142;
          dyingTree3.onload = () => {
            Promise.resolve(dyingTree3);
          };
        };
      },
      () => {
        return () => {
          dyingTree4.height = 170;

          deadTree5.width = 142;
          dyingTree4.onload = () => {
            Promise.resolve(dyingTree4);
          };
        };
      },
      () => {
        return () => {
          dyingTree5.height = 170;

          deadTree5.width = 142;
          dyingTree5.onload = () => {
            Promise.resolve(dyingTree5);
          };
        };
      },
      () => {
        return () => {
          dyingTree6.height = 170;
          deadTree5.width = 142;
          dyingTree6.onload = () => {
            Promise.resolve(dyingTree6);
          };
        };
      },
      // --------------------- dead tree

      () => {
        return () => {
          deadTree1.height = 170;
          deadTree5.width = 142;
          deadTree1.onload = () => {
            Promise.resolve(deadTree1);
          };
        };
      },
      () => {
        return () => {
          deadTree2.height = 170;
          deadTree5.width = 142;
          deadTree2.onload = () => {
            Promise.resolve(deadTree2);
          };
        };
      },
      () => {
        return () => {
          deadTree3.height = 170;
          deadTree5.width = 142;
          deadTree3.onload = () => {
            Promise.resolve(deadTree3);
          };
        };
      },
      () => {
        return () => {
          deadTree4.height = 170;
          deadTree5.width = 142;
          deadTree4.onload = () => {
            Promise.resolve(deadTree4);
          };
        };
      },
      () => {
        return () => {
          deadTree5.height = 170;
          deadTree5.width = 142;
          deadTree5.onload = () => {
            Promise.resolve(deadTree5);
          };
        };
      },
      () => {
        return () => {
          deadTree6.height = 170;
          deadTree5.width = 142;
          deadTree6.onload = () => {
            Promise.resolve(deadTree6);
          };
        };
      },
    ]).then(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.treesData.forEach((tree) => {
        let treeToRender: any = '';

        // happy trees only
        const treeIndex = Math.floor(Math.random() * 6) + 1;

        // dying trees only
        // const treeIndex = Math.floor(Math.random() * 6) + 7;

        // dead trees only
        // const treeIndex = Math.floor(Math.random() * 6) + 13;
        switch (treeIndex) {
          case 1:
            treeToRender = happyTree1;
            break;
          case 2:
            treeToRender = happyTree2;
            break;
          case 3:
            treeToRender = happyTree3;
            break;
          case 4:
            treeToRender = happyTree4;
            break;
          case 5:
            treeToRender = happyTree5;
            break;
          case 6:
            treeToRender = happyTree6;
            break;
          case 7:
            treeToRender = dyingTree1;
            break;
          case 8:
            treeToRender = dyingTree2;
            break;
          case 9:
            treeToRender = dyingTree3;
            break;
          case 10:
            treeToRender = dyingTree4;
            break;
          case 11:
            treeToRender = dyingTree5;
            break;
          case 12:
            treeToRender = dyingTree6;
            break;
          case 13:
            treeToRender = deadTree1;
            break;
          case 14:
            treeToRender = deadTree2;
            break;
          case 15:
            treeToRender = deadTree3;
            break;
          case 16:
            treeToRender = deadTree4;
            break;
          case 17:
            treeToRender = deadTree5;
            break;
          case 18:
            treeToRender = deadTree6;
            break;
        }
        ctx.drawImage(
          treeToRender,
          0,
          0,
          170,
          142,
          tree.posX,
          tree.posY + 150,
          130,
          122,
        );
      });
      if (this.first < 3) {
        this.first += 1;
        requestAnimationFrame(() => this.drawTrees());
      }
    });
  }

  drawAnimals() {
    const dog = new Image();
    dog.src = '../assets/dog_new.png';

    const sheep = new Image();
    sheep.src = '../assets/sheep.png';

    const canvas = this.animals.nativeElement;
    const ctx = canvas.getContext('2d');

    Promise.all([
      () => {
        return () => {
          sheep.height = 16;
          sheep.width = 14;
          sheep.onload = () => {
            Promise.resolve(sheep);
          };
        };
      },
      () => {
        return () => {
          dog.height = 16;
          dog.width = 14;
          dog.onload = () => {
            Promise.resolve(dog);
          };
        };
      },
    ]).then(() => {
      setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.animalsData.forEach((animal) => {
          let animalToRender = animal.animalType === 'dog' ? dog : sheep;

          const offsetX = Math.floor(Math.random() * 15) + 1;
          const offsetY = Math.floor(Math.random() * 15) + 1;

          ctx.drawImage(
            animalToRender,
            0,
            0,
            14,
            16,
            animal.posX + offsetX,
            animal.posY + offsetY + 200,
            28,
            32,
          );
        });
      }, 300);
    });
  }

  test($event: any) {
    let companyName = '';
    this.dialog
      .open(PlantSapplingComponent, {
        minWidth: 600,
        maxWidth: 600,
        minHeight: 200,
      })
      .afterClosed()
      .pipe(
        first(),
        switchMap((data: string) => {
          companyName = data;
          return this.getCompanyEsgData(data);
        }),
      )
      .subscribe((result: any) => {
        this.loadedCompanies.push({
          companyName: companyName,
          revenue: Math.floor(Math.random() * 100) - 5,
          environmental: (result as EsgFactors).environmental,
          social: (result as EsgFactors).social,
          governance: (result as EsgFactors).governance,
        } as LoadedCompany);

        this.environmental = (
          this.loadedCompanies
            .map((data) => data.environmental)
            .reduce((a, b) => a + b, 0) / this.loadedCompanies.length
        ).toFixed(2);
        this.social = (
          this.loadedCompanies
            .map((data) => data.social)
            .reduce((a, b) => a + b, 0) / this.loadedCompanies.length
        ).toFixed(2);
        this.governance = (
          this.loadedCompanies
            .map((data) => data.governance)
            .reduce((a, b) => a + b, 0) / this.loadedCompanies.length
        ).toFixed(2);
        this.revenue = (
          this.loadedCompanies
            .map((data) => data.revenue)
            .reduce((a, b) => a + b, 0) / this.loadedCompanies.length
        ).toFixed(2);

        this.cloudsData = [
          ...this.cloudsData,
          ...this.cloudDataBase.slice(
            this.cloudsData.length,
            this.loadedCompanies.length * 3,
          ),
        ];

        this.treesData = [
          ...this.treesData,
          ...this.treesDatabase.slice(
            this.treesData.length,
            this.loadedCompanies.length * 3,
          ),
        ];

        this.animalsData = [
          ...this.animalsData,
          ...this.animalsDatabase.slice(
            this.animalsData.length,
            this.loadedCompanies.length * 3,
          ),
        ];

        this.drawAnimals()
        this.drawClouds();
        this.drawTrees();
        console.log(result);
      });
  }

  getCompanyEsgData(companyName: string) {
    return this.httpClient.get(
      `http://localhost:5000/company-esg/${encodeURIComponent(companyName)}`,
    );
  }

  removeCompany(companyName: string) {
    this.loadedCompanies = this.loadedCompanies.filter(
      (company) => company.companyName !== companyName,
    );

    this.environmental = (
      this.loadedCompanies
        .map((data) => data.environmental)
        .reduce((a, b) => a + b, 0) / this.loadedCompanies.length
    ).toFixed(2);
    this.social = (
      this.loadedCompanies
        .map((data) => data.social)
        .reduce((a, b) => a + b, 0) / this.loadedCompanies.length
    ).toFixed(2);
    this.governance = (
      this.loadedCompanies
        .map((data) => data.governance)
        .reduce((a, b) => a + b, 0) / this.loadedCompanies.length
    ).toFixed(2);
    this.revenue = (
      this.loadedCompanies
        .map((data) => data.revenue)
        .reduce((a, b) => a + b, 0) / this.loadedCompanies.length
    ).toFixed(2);

    this.cloudsData = [
      ...this.cloudsData,
      ...this.cloudDataBase.slice(
        this.cloudsData.length,
        this.loadedCompanies.length * 3,
      ),
    ];

    this.treesData = [
      ...this.treesData,
      ...this.treesDatabase.slice(
        this.treesData.length,
        this.loadedCompanies.length * 3,
      ),
    ];

    this.animalsData = [
      ...this.animalsData,
      ...this.animalsDatabase.slice(
        this.animalsData.length,
        this.loadedCompanies.length * 3,
      ),
    ];

    this.drawAnimals()
    this.drawClouds();
    this.drawTrees();
  }
}
