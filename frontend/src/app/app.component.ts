import {
  Component,
  ElementRef,
  inject,
  Injector,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { MetricsComponent } from './metrics/components/metrics-shell/metrics.component';
import { WalletComponent } from './wallet/components/wallet-shell/wallet.component';
import { SingleAssetComponent } from './wallet/components/single-asset/single-asset.component';
import { WelcomeModalComponent } from './modals/welcome-modal/welcome-modal.component';
import { PlantSaplingModalComponent } from './modals/plant-sappling-modal/plant-sapling-modal.component';
import {filter, first, forkJoin, switchMap} from 'rxjs';
import { ManufacturerService } from './shared/service/manufacturer/manufacturer.service';
import { WalletService } from './shared/service/wallet/wallet.service';
import { WalletManufacturer } from './shared/model/manufacturer/wallet-manufacturer.interface';
import { RevenueDto } from './shared/model/dto/revenue.dto';
import { EsgScoreDto } from './shared/model/dto/esg-score.dto';
import { BaseStageComponent } from './stage/components/base-stage.component';
import { SkyStageComponent } from './stage/components/sky-stage/sky-stage.component';
import { GroundStageComponent } from './stage/components/ground-stage/ground-stage.component';
import { MatButton } from '@angular/material/button';
import { NgStyle } from '@angular/common';
import { PropDetailsService } from './stage/services/prop-detail/prop-details.service';
import { PropDetails } from './stage/models/prop-details.interface';
import { OverlayService } from './stage/services/overlay/overlay.service';
import { FactorType } from './stage/models/esg.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  imports: [
    NavbarComponent,
    MetricsComponent,
    WalletComponent,
    SingleAssetComponent,
    BaseStageComponent,
    SkyStageComponent,
    GroundStageComponent,
    MatButton,
    NgStyle
  ]
})
export class AppComponent implements OnInit {
  @ViewChild(SkyStageComponent) skyStage!: SkyStageComponent;

  @ViewChild(GroundStageComponent) groundStage!: GroundStageComponent;

  @ViewChildren(MatButton, { read: ElementRef }) buttons!: QueryList<ElementRef>;

  private readonly overlayService: OverlayService = inject(OverlayService);

  private readonly manufacturerService: ManufacturerService = inject(ManufacturerService);

  private readonly walletService: WalletService = inject(WalletService);

  private readonly propDetailsService: PropDetailsService = inject(PropDetailsService);

  private readonly dialog: MatDialog = inject(MatDialog);

  private readonly viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

  private readonly injector: Injector = inject(Injector);

  ngOnInit(): void {
    if (!localStorage.getItem('isFirstVisit')) {
      localStorage.setItem('isFirstVisit', 'true');
      this.dialog.open(WelcomeModalComponent, {
        minWidth: 600,
        maxWidth: 600,
        minHeight: 300
      });
    }

    this.listenForStageClicks();
  }

  listenForStageClicks(): void {
    this.propDetailsService.propDetails$.subscribe((propDetails: PropDetails) => {
      this.overlayService.create(propDetails, this.viewContainerRef, this.injector);
    });
  }

  addManufacturerToWallet(): void {
    this.dialog
      .open(PlantSaplingModalComponent, {
        minWidth: 600,
        maxWidth: 600,
        minHeight: 200
      })
      .afterClosed()
      .pipe(
        first(),
          filter((ISIN_BC: string) => !!ISIN_BC),
        switchMap((ISIN_BC: string) =>
          forkJoin([
            this.manufacturerService.getManufacturerRevenue(ISIN_BC),
            this.manufacturerService.getManufacturerEsgScore(ISIN_BC)
          ])
        )
      )
      .subscribe(([manufacturerRevenue, esgScore]: [RevenueDto, EsgScoreDto]): void => {
        const walletManufacturer: WalletManufacturer = {
          ISIN_BC: manufacturerRevenue.ISIN_BC,
          companyLongName: manufacturerRevenue.companyLongName,
          listingShortName: manufacturerRevenue.listingShortName,
          revenue: manufacturerRevenue.revenue,
          environmental: esgScore.environmental,
          social: esgScore.social,
          governance: esgScore.governance
        } satisfies WalletManufacturer;

        this.walletService.addManufacturer(walletManufacturer);

        this.skyStage.renderElements(
          FactorType.ENVIRONMENTAL,
          esgScore.environmental,
          manufacturerRevenue.ISIN_BC,
          manufacturerRevenue.revenue
        );

        this.groundStage.renderElements(
          FactorType.ENVIRONMENTAL,
          esgScore.environmental,
          manufacturerRevenue.ISIN_BC,
          manufacturerRevenue.revenue
        );

        this.groundStage.renderElements(
          FactorType.SOCIAL,
          esgScore.social,
          manufacturerRevenue.ISIN_BC,
          manufacturerRevenue.revenue
        );

        this.groundStage.renderElements(
          FactorType.GOVERNANCE,
          esgScore.governance,
          manufacturerRevenue.ISIN_BC,
          manufacturerRevenue.revenue
        );

        // this.groundStage.console.log('Wallet manufacturer', walletManufacturer);
      });
  }

  clearButtonsStyle(): void {
    this.buttons.forEach((button: ElementRef) => {
      button.nativeElement.style.backgroundColor = '';
      button.nativeElement.style.color = 'black';
    });
  }

  renderPredefinedScoreView(id: number): void {
    this.clearButtonsStyle();
    this.buttons!.get(id)!.nativeElement.style.backgroundColor = '#de3919';
    this.buttons!.get(id)!.nativeElement.style.color = 'white';
    switch (id) {
      case 0:
        this.skyStage.badScoreView();
        this.groundStage.badScoreView();
        break;
      case 1:
        this.skyStage.goodScoreView();
        this.groundStage.goodScoreView();
        break;
    }
  }
}

// E
//
// Trees: (E)
// Score is high - healthy tree
// Score is low - dead tree

// Clouds: (E)
// Score is low - polluted cloud
// Score is high - healthy cloud

// Plants (E)
// Score above > .5 - we render them
//
// S
//
// Dog
// Score above > .5  render dog, then above each of 0.1 we render additional dog
// Sheep  above > .5  render sheep, then above each of 0.1 we render additional sheep

//
// G
//
// Debris (G)
// Score below .5 >  we render them
// Rock
// Score below .5 > we render them
// Ranger
// SCore above > .5 then above each of 0.1 we render additional dog
