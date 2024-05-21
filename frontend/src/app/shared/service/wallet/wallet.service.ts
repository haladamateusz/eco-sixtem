import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WalletManufacturer } from '../../model/manufacturer/wallet-manufacturer.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private manufacturers$: BehaviorSubject<WalletManufacturer[]> = new BehaviorSubject<
    WalletManufacturer[]
  >([]);

  getManufacturers(): Observable<WalletManufacturer[]> {
    return this.manufacturers$.asObservable();
  }

  addManufacturer(manufacturer: WalletManufacturer): void {
    const manufacturers: WalletManufacturer[] = this.manufacturers$.getValue();
    manufacturers.push(manufacturer);
    this.manufacturers$.next(manufacturers);
  }

  removeManufacturer(ISIN_BC: string): void {
    const manufacturers: WalletManufacturer[] = this.manufacturers$.getValue();
    const updatedManufacturers: WalletManufacturer[] = manufacturers.filter(
      (manufacturer: WalletManufacturer) => manufacturer.ISIN_BC !== ISIN_BC
    );
    this.manufacturers$.next(updatedManufacturers);
  }
}
