import { Component, inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { WalletManufacturer } from '../../../shared/model/manufacturer/wallet-manufacturer.interface';
import { Observable } from 'rxjs';
import { WalletService } from '../../../shared/service/wallet/wallet.service';
import { AsyncPipe } from '@angular/common';
import { SingleAssetComponent } from '../single-asset/single-asset.component';

@Component({
  selector: 'app-wallet',
  standalone: true,
  templateUrl: './wallet.component.html',
  imports: [
    MatFormField,
    MatAutocomplete,
    MatAutocompleteTrigger,
    FormsModule,
    MatOption,
    MatInput,
    AsyncPipe,
    SingleAssetComponent
  ],
  styleUrl: './wallet.component.scss'
})
export class WalletComponent /* implements OnInit */ {
  walletService = inject(WalletService);

  assets$: Observable<WalletManufacturer[]> = this.walletService.getManufacturers();

  removeFromWallet(ISIN_BC: string): void {
    this.walletService.removeManufacturer(ISIN_BC);
  }

  // filterValue: string = '';

  // options: string[] = ['One', 'Two', 'Three'];

  // ngOnInit() {
  // this.filteredOptions = this.myControl.valueChanges.pipe(
  //   startWith(''),
  //   map((value) => this._filter(value || ''))
  // );
  // }

  // private _filter(value: string): string[] {
  //  const filterValue = value.toLowerCase();

  //  return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  //}
}
