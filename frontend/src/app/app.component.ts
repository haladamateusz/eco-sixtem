import { AfterViewChecked, Component, inject, OnInit } from '@angular/core';
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
import { StageWrapperComponent } from './stage/components/stage-wrapper/stage-wrapper.component';

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
    StageWrapperComponent
  ]
})
export class AppComponent implements OnInit, AfterViewChecked {
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
}
