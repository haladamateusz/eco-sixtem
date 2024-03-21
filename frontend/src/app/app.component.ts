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

interface Cloud {
  posX: number;
  posY: number;
  polluted: boolean;
}

interface Tree {
  posX: number;
  posY: number;
  polluted: boolean;
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
  styleUrls: ['./app.component.scss'],
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
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 100,
      posX: Math.floor(Math.random() * 35) + 100,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 100,
      posX: Math.floor(Math.random() * 35) + 200,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 50,
      posX: Math.floor(Math.random() * 65) + 400,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 80,
      posX: Math.floor(Math.random() * 65) + 500,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 60,
      posX: Math.floor(Math.random() * 65) + 600,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 40,
      posX: Math.floor(Math.random() * 65) + 800,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 50,
      posX: Math.floor(Math.random() * 65) + 1100,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 80,
      posX: Math.floor(Math.random() * 65) + 1200,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 20,
      posX: Math.floor(Math.random() * 65) + 1300,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 35) + 30,
      posX: Math.floor(Math.random() * 65) + 1400,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 35) + 130,
      posX: Math.floor(Math.random() * 35) + 30,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 200,
      posX: Math.floor(Math.random() * 35) + 100,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 200,
      posX: Math.floor(Math.random() * 65) + 200,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 150,
      posX: Math.floor(Math.random() * 65) + 400,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 180,
      posX: Math.floor(Math.random() * 65) + 500,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 160,
      posX: Math.floor(Math.random() * 65) + 600,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 140,
      posX: Math.floor(Math.random() * 65) + 800,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 150,
      posX: Math.floor(Math.random() * 65) + 1100,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 180,
      posX: Math.floor(Math.random() * 65) + 1200,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 120,
      posX: Math.floor(Math.random() * 65) + 1300,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 130,
      posX: Math.floor(Math.random() * 65) + 1400,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 230,
      posX: Math.floor(Math.random() * 65) + 30,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 300,
      posX: Math.floor(Math.random() * 65) + 100,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 300,
      posX: Math.floor(Math.random() * 65) + 200,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 250,
      posX: Math.floor(Math.random() * 65) + 400,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 280,
      posX: Math.floor(Math.random() * 65) + 500,
      polluted: true,
    },
    {
      posY: Math.floor(Math.random() * 65) + 260,
      posX: Math.floor(Math.random() * 65) + 600,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 240,
      posX: Math.floor(Math.random() * 65) + 800,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 250,
      posX: Math.floor(Math.random() * 65) + 1100,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 280,
      posX: Math.floor(Math.random() * 65) + 1200,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 220,
      posX: Math.floor(Math.random() * 65) + 1300,
      polluted: false,
    },
    {
      posY: Math.floor(Math.random() * 65) + 230,
      posX: Math.floor(Math.random() * 65) + 14300,
      polluted: false,
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
      posX: Math.floor(Math.random() * 65) + 1200,
      dead: false,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 20,
      posX: Math.floor(Math.random() * 65) + 1300,
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
      posX: Math.floor(Math.random() * 65) + 1300,
      dead: false,
      animalType: 'dog',
    },
    {
      posY: Math.floor(Math.random() * 65) + 130,
      posX: Math.floor(Math.random() * 65) + 1400,
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
      posX: Math.floor(Math.random() * 65) + 1300,
      dead: false,
      animalType: 'cat',
    },
    {
      posY: Math.floor(Math.random() * 65) + 230,
      posX: Math.floor(Math.random() * 65) + 14300,
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

    this.terrain.nativeElement.width = window.innerWidth - 4;
    this.terrain.nativeElement.height = window.innerHeight - 15;

    this.trees.nativeElement.width = window.innerWidth - 4;
    this.trees.nativeElement.height = window.innerHeight - 15;

    this.animals.nativeElement.width = window.innerWidth - 4;
    this.animals.nativeElement.height = window.innerHeight - 15;

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
    const canvas = this.terrain.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#90EE90';
      ctx.fillRect(0, 200, canvas.width, 700);
    }
  }

  drawTrees() {
    const happyTree = new Image();
    happyTree.src = '../assets/happy_tree.png';

    const pollutedTree = new Image();
    pollutedTree.src = '../assets/sad_tree.png';

    const canvas = this.trees.nativeElement;
    const ctx = canvas.getContext('2d');

    Promise.all([
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
          pollutedTree.height = 80;
          pollutedTree.width = 80;
          pollutedTree.onload = () => {
            Promise.resolve(pollutedTree);
          };
        };
      },
    ]).then(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.treesData.forEach((tree) => {
        ctx.drawImage(
          tree.polluted ? pollutedTree : happyTree,
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
            animalWidth = 497
          }
          if (animal.animalType === 'dog') {
            animalWidth = 337
          }

          ctx.drawImage(
            animal.dead ? skull : animalToRender,
            0,
            0,
            animalWidth,
            300,
            animal.dead ? animal.posX : animal.posX + offsetX,
            animal.dead ? animal.posY + 200 : animal.posY + offsetY + 200,
            animalWidth/12,
            25,
          );
        });
      }, 300);
    });
  }

  test($event: any) {
    console.log($event);
  }
}
