import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { ManufacturerService } from '../../shared/service/manufacturer/manufacturer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Manufacturer } from '../../shared/model/manufacturer/manufacturer.interface';
import { WalletService } from '../../shared/service/wallet/wallet.service';
import { WalletManufacturer } from '../../shared/model/manufacturer/wallet-manufacturer.interface';

@Component({
  selector: 'app-plant-sapling-modal',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatSelectModule, FormsModule, MatButtonModule],
  templateUrl: './plant-sapling-modal.component.html',
  styleUrls: ['./plant-sapling-modal.component.scss']
})
export class PlantSaplingModalComponent {
  companyService: ManufacturerService = inject(ManufacturerService);

  walletService: WalletService = inject(WalletService);

  dialog: MatDialogRef<PlantSaplingModalComponent> = inject(
    MatDialogRef<PlantSaplingModalComponent>
  );

  sapling = '';

  manufacturers$: Observable<Manufacturer[]> = combineLatest([
    this.companyService.getManufacturers(),
    this.walletService.getManufacturers()
  ]).pipe(
    takeUntilDestroyed(),
    switchMap(
      ([allManufacturers, manufacturersInWallet]: [Manufacturer[], WalletManufacturer[]]) => {
        const filteredManufacturers: Manufacturer[] = allManufacturers.filter(
          (manufacturer: Manufacturer) =>
            !manufacturersInWallet.find(
              (manufacturerInWallet: WalletManufacturer): boolean =>
                manufacturerInWallet.ISIN_BC === manufacturer.ISIN_BC
            )
        );
        return of(filteredManufacturers);
      }
    )
  );

  onClose(): void {
    this.dialog.close(this.sapling);
  }
}
