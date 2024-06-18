import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { WalletService } from '../../../shared/service/wallet/wallet.service';
import { Subject, takeUntil } from 'rxjs';
import { WalletManufacturer } from '../../../shared/model/manufacturer/wallet-manufacturer.interface';

@Component({
  selector: 'app-prop-details',
  standalone: true,
  imports: [],
  templateUrl: './prop-details.component.html',
  styleUrl: './prop-details.component.scss'
})
export class PropDetailsComponent implements OnInit, OnDestroy {
  @Input() label: string = 'NO_LABEL_PASSED';

  manufacturer: WalletManufacturer | null = null;

  private readonly walletService: WalletService = inject(WalletService);

  spriteType: string = '';

  ISIN_BC: string = '';

  factor: 'environmental' | 'social' | 'governance' | '' = '';

  score: number = 0;

  destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    const labelItems: string[] = this.label.split('@');
    this.spriteType = labelItems[0];
    this.ISIN_BC = labelItems[1];

    this.walletService
      .getManufacturer(this.ISIN_BC)
      .pipe(takeUntil(this.destroy$))
      .subscribe((manufacturer: WalletManufacturer | null) => {
        if (manufacturer !== null) {
          this.manufacturer = manufacturer;

          if (['cloud', 'tree'].includes(this.spriteType)) {
            this.factor = 'environmental';
            this.score = this.manufacturer.environmental;
          } else if (['sheep', 'wolf', 'bug', 'chicken'].includes(this.spriteType)) {
            this.factor = 'social';
            this.score = this.manufacturer.social;
          } else if (['ranger', 'plant', 'rock', 'debris'].includes(this.spriteType)) {
            this.factor = 'governance';
            this.score = this.manufacturer.governance;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
