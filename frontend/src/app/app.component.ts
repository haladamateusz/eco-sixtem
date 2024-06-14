import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { MetricsComponent } from './metrics/components/metrics-shell/metrics.component';
import { WalletComponent } from './wallet/components/wallet-shell/wallet.component';
import { SingleAssetComponent } from './wallet/components/single-asset/single-asset.component';
import { WelcomeModalComponent } from './modals/welcome-modal/welcome-modal.component';
import { PlantSaplingModalComponent } from './modals/plant-sappling-modal/plant-sapling-modal.component';
import { first, forkJoin, switchMap } from 'rxjs';
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
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild(SkyStageComponent) skyStage!: SkyStageComponent;

  @ViewChild(GroundStageComponent) groundStage!: GroundStageComponent;

  @ViewChildren(MatButton, { read: ElementRef }) buttons!: QueryList<ElementRef>;

  manufacturerService: ManufacturerService = inject(ManufacturerService);

  walletService: WalletService = inject(WalletService);

  dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    if (!localStorage.getItem('isFirstVisit')) {
      localStorage.setItem('isFirstVisit', 'true');
      this.dialog.open(WelcomeModalComponent, {
        minWidth: 600,
        maxWidth: 600,
        minHeight: 300
      });
    }
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
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
        switchMap((isinBcCode: string) =>
          forkJoin([
            this.manufacturerService.getManufacturerRevenue(isinBcCode),
            this.manufacturerService.getManufacturerEsgScore(isinBcCode)
          ])
        )
      )
      .subscribe(([revenue, esgScore]: [RevenueDto, EsgScoreDto]): void => {
        const walletManufacturer: WalletManufacturer = {
          ISIN_BC: revenue.ISIN_BC,
          companyLongName: revenue.companyLongName,
          listingShortName: revenue.listingShortName,
          revenue: revenue.revenue,
          environmental: esgScore.environmental,
          social: esgScore.social,
          governance: esgScore.governance
        } satisfies WalletManufacturer;

        this.walletService.addManufacturer(walletManufacturer);
        console.log('Wallet manufacturer', walletManufacturer);
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
