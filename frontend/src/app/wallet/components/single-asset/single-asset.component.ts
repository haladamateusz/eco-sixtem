import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { WalletManufacturer } from '../../../shared/model/manufacturer/wallet-manufacturer.interface';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-single-asset',
  standalone: true,
  imports: [NgOptimizedImage, MatTooltip],
  templateUrl: './single-asset.component.html',
  styleUrl: './single-asset.component.scss'
})
export class SingleAssetComponent {
  @Input() asset!: WalletManufacturer;

  @Output() removeAsset: EventEmitter<string> = new EventEmitter<string>();

  remove(): void {
    this.removeAsset.emit(this.asset.ISIN_BC);
  }
}
