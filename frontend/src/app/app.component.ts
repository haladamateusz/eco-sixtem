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
import { HoverButtonComponent } from "./hover-button/hover-button.component";
import { InfographicComponent } from "./infographic/infographic.component";
import { HoverInfoComponent } from "./hover-info/hover-info.component";
import { ModalWrapperComponent } from "./modal-wrapper/modal-wrapper.component";
import { PlantSapplingComponent } from "./plant-sappling/plant-sappling.component";

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  imports: [HoverButtonComponent, InfographicComponent, HoverInfoComponent],
})
export class AppComponent implements OnInit, AfterViewInit {
  cdr = inject(ChangeDetectorRef);

  title = 'eco-sixtem';

  isFirstVisit = true;

  dialog = inject(MatDialog);

  cloudsData: Cloud[] = [
    { posY: 30, posX: 30, polluted: true },
    { posY: 100, posX: 100, polluted: true },
    { posY: 100, posX: 200, polluted: true },
    { posY: 50, posX: 400, polluted: true },
    { posY: 80, posX: 500, polluted: true },
    { posY: 60, posX: 600, polluted: false },
    { posY: 40, posX: 800, polluted: false },
    { posY: 50, posX: 1100, polluted: false },
    { posY: 80, posX: 1200, polluted: false },
    { posY: 20, posX: 1300, polluted: false },
    { posY: 30, posX: 1400, polluted: false },
  ];

  treesData: Tree[] = [
    {
      posY: Math.floor(Math.random() * 65) + 30,
      posX: Math.floor(Math.random() * 35) + 30,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 100,
      posX: Math.floor(Math.random() * 35) + 100,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 100,
      posX: Math.floor(Math.random() * 35) + 200,
      state: 'healthy',
    },
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
    {
      posY: Math.floor(Math.random() * 65) + 60,
      posX: Math.floor(Math.random() * 65) + 600,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 40,
      posX: Math.floor(Math.random() * 65) + 800,
      state: 'healthy',
    },
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
    {
      posY: Math.floor(Math.random() * 35) + 130,
      posX: Math.floor(Math.random() * 35) + 30,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 200,
      posX: Math.floor(Math.random() * 35) + 100,
      state: 'healthy',
    },
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
    {
      posY: Math.floor(Math.random() * 65) + 150,
      posX: Math.floor(Math.random() * 65) + 1100,
      state: 'dying',
    },
    {
      posY: Math.floor(Math.random() * 65) + 180,
      posX: Math.floor(Math.random() * 65) + 1200,
      state: 'dead',
    },
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
    {
      posY: Math.floor(Math.random() * 65) + 300,
      posX: Math.floor(Math.random() * 65) + 100,
      state: 'dying',
    },
    {
      posY: Math.floor(Math.random() * 65) + 300,
      posX: Math.floor(Math.random() * 65) + 200,
      state: 'healthy',
    },
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
    {
      posY: Math.floor(Math.random() * 65) + 280,
      posX: Math.floor(Math.random() * 65) + 1200,
      state: 'healthy',
    },
    {
      posY: Math.floor(Math.random() * 65) + 220,
      posX: Math.floor(Math.random() * 65) + 1300,
      state: 'dying',
    },
    {
      posY: Math.floor(Math.random() * 65) + 230,
      posX: Math.floor(Math.random() * 65) + 1400,
      state: 'dead',
    },
  ];

  animalsData: Animal[] = [
    {
      posY: Math.floor(Math.random() * 65) + 30,
      posX: Math.floor(Math.random() * 35) + 30,
      dead: true,
      animalType: 'cat',
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
      animalType: 'cow',
    },
    {
      posY: Math.floor(Math.random() * 65) + 50,
      posX: Math.floor(Math.random() * 65) + 400,
      dead: true,
      animalType: 'cat',
    },
    {
      posY: Math.floor(Math.random() * 65) + 80,
      posX: Math.floor(Math.random() * 65) + 500,
      dead: true,
      animalType: 'cow',
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
      animalType: 'cat',
    },
    {
      posY: Math.floor(Math.random() * 65) + 50,
      posX: Math.floor(Math.random() * 65) + 1100,
      dead: false,
      animalType: 'cat',
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
      animalType: 'cat',
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
      animalType: 'cat',
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
      animalType: 'cow',
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
      animalType: 'cat',
    },
    {
      posY: Math.floor(Math.random() * 65) + 160,
      posX: Math.floor(Math.random() * 65) + 600,
      dead: false,
      animalType: 'cow',
    },
    {
      posY: Math.floor(Math.random() * 65) + 140,
      posX: Math.floor(Math.random() * 65) + 800,
      dead: false,
      animalType: 'cat',
    },
    {
      posY: Math.floor(Math.random() * 65) + 150,
      posX: Math.floor(Math.random() * 65) + 1100,
      dead: false,
      animalType: 'cow',
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
      animalType: 'cow',
    },
    {
      posY: Math.floor(Math.random() * 65) + 230,
      posX: Math.floor(Math.random() * 65) + 30,
      dead: true,
      animalType: 'cat',
    },
    {
      posY: Math.floor(Math.random() * 65) + 300,
      posX: Math.floor(Math.random() * 65) + 100,
      dead: true,
      animalType: 'cow',
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
      animalType: 'cat',
    },
    {
      posY: Math.floor(Math.random() * 65) + 280,
      posX: Math.floor(Math.random() * 65) + 500,
      dead: true,
      animalType: 'cow',
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
      animalType: 'cat',
    },
    {
      posY: Math.floor(Math.random() * 65) + 250,
      posX: Math.floor(Math.random() * 65) + 1100,
      dead: false,
      animalType: 'cow',
    },
    {
      posY: Math.floor(Math.random() * 65) + 280,
      posX: Math.floor(Math.random() * 65) + 1200,
      dead: false,
      animalType: 'cat',
    },
    {
      posY: Math.floor(Math.random() * 65) + 220,
      posX: Math.floor(Math.random() * 65) + 1050,
      dead: false,
      animalType: 'cat',
    },
    {
      posY: Math.floor(Math.random() * 65) + 230,
      posX: Math.floor(Math.random() * 65) + 1200,
      dead: false,
      animalType: 'cow',
    },
  ];

  @ViewChild('clouds', { static: true }) clouds!: ElementRef;

  @ViewChild('sky', { static: true }) sky!: ElementRef;

  @ViewChild('terrain', { static: true }) terrain!: ElementRef;

  @ViewChild('trees', { static: true }) trees!: ElementRef;

  @ViewChild('animals', { static: true }) animals!: ElementRef;

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

    this.drawSky();
    this.drawClouds();
    this.drawTerrain();
    this.drawTrees();
    this.drawAnimals();
    this.cdr.detectChanges();
  }

  drawSky(): void {
    const canvas = this.sky.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grd.addColorStop(0, 'deepskyblue');
      grd.addColorStop(1, '#87CEEB');
      // ctx.fillStyle = 'deepskyblue';
      ctx.fillStyle = grd;
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

    Promise.all([
      () => {
        return () => {
          happyCloud.height = 80;
          happyCloud.width = 80;
          happyCloud.onload = () => {
            Promise.resolve(happyCloud);
          };
        };
      },
      () => {
        return () => {
          pollutedCloud.height = 80;
          pollutedCloud.width = 80;
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
            339,
            339,
            cloud.posX + offsetX,
            cloud.posY + offsetY,
            50,
            50,
          );
        });
      }, 300);
    });
  }

  drawTerrain() {
    const grass = new Image();
    grass.src = '../assets/grass3.jpg';
    const canvas = this.terrain.nativeElement;
    const ctx = canvas.getContext('2d');

    grass.onload = () => {
      var pat = ctx.createPattern(grass, 'repeat');
      ctx.fillStyle = pat;
      ctx.rect(0, 200, canvas.width, 700);
      ctx.fill();
    };
  }

  drawTrees() {
    const happyTree = new Image();
    happyTree.src = '../assets/happy_tree.png';

    const dyingTree = new Image();
    dyingTree.src = '../assets/dying_tree.png';

    const deadTree = new Image();
    deadTree.src = '../assets/sad_tree.png';

    const canvas = this.trees.nativeElement;
    const ctx = canvas.getContext('2d');

    Promise.all([
      () => {
        return () => {
          dyingTree.height = 80;
          dyingTree.width = 80;
          dyingTree.onload = () => {
            Promise.resolve(dyingTree);
          };
        };
      },
      () => {
        return () => {
          happyTree.height = 80;
          happyTree.width = 80;
          happyTree.onload = () => {
            Promise.resolve(happyTree);
          };
        };
      },
      () => {
        return () => {
          deadTree.height = 80;
          deadTree.width = 80;
          deadTree.onload = () => {
            Promise.resolve(deadTree);
          };
        };
      },
    ]).then(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.treesData.forEach((tree) => {
        let treeToRender: any = '';
        switch (tree.state) {
          case 'healthy':
            treeToRender = happyTree;
            break;
          case 'dying':
            treeToRender = dyingTree;
            break;
          case 'dead':
            treeToRender = deadTree;
            break;
        }
        ctx.drawImage(
          treeToRender,
          0,
          0,
          339,
          339,
          tree.posX,
          tree.posY + 250,
          50,
          50,
        );
      });

      requestAnimationFrame(() => this.drawTrees());
    });
  }

  drawAnimals() {
    const cat = new Image();
    cat.src = '../assets/cat.png';

    const cow = new Image();
    cow.src = '../assets/cow.png';

    const dog = new Image();
    dog.src = '../assets/dog.png';

    const skull = new Image();
    skull.src = '../assets/skull.png';

    const canvas = this.animals.nativeElement;
    const ctx = canvas.getContext('2d');

    Promise.all([
      () => {
        return () => {
          cat.height = 80;
          cat.width = 80;
          cat.onload = () => {
            Promise.resolve(cat);
          };
        };
      },
      () => {
        return () => {
          cow.height = 80;
          cow.width = 80;
          cow.onload = () => {
            Promise.resolve(cow);
          };
        };
      },
      () => {
        return () => {
          dog.height = 80;
          dog.width = 80;
          dog.onload = () => {
            Promise.resolve(dog);
          };
        };
      },
      () => {
        return () => {
          skull.height = 80;
          skull.width = 80;
          skull.onload = () => {
            Promise.resolve(skull);
          };
        };
      },
    ]).then(() => {
      setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.animalsData.forEach((animal) => {
          let animalToRender: any = '';

          switch (animal.animalType) {
            case 'cat':
              animalToRender = cat;
              break;
            case 'cow':
              animalToRender = cow;
              break;
            case 'dog':
              animalToRender = dog;
              break;
          }

          const offsetX = Math.floor(Math.random() * 15) + 1;
          const offsetY = Math.floor(Math.random() * 15) + 1;

          let animalWidth = 300;

          if (animal.animalType === 'cow') {
            animalWidth = 497;
          }
          if (animal.animalType === 'dog') {
            animalWidth = 337;
          }

          ctx.drawImage(
            animal.dead ? skull : animalToRender,
            0,
            0,
            animalWidth,
            300,
            animal.dead ? animal.posX : animal.posX + offsetX,
            animal.dead ? animal.posY + 200 : animal.posY + offsetY + 200,
            animalWidth / 12,
            25,
          );
        });
      }, 300);
    });
  }

  test($event: any) {
    this.dialog.open(PlantSapplingComponent, {
      minWidth: 600,
      maxWidth: 600,
      minHeight: 300,
    });
  }
}
