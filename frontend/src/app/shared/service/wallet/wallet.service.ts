import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Manufacturer } from '../../model/manufacturer/manufacturer.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  manufacturers$: BehaviorSubject<Manufacturer[]> = new BehaviorSubject<Manufacturer[]>([]);

  getManufacturers(): Observable<Manufacturer[]> {
    return this.manufacturers$.asObservable();
  }

  addManufacturer(manufacturer: Manufacturer): void {
    const manufacturers: Manufacturer[] = this.manufacturers$.getValue();
    manufacturers.push(manufacturer);
    this.manufacturers$.next(manufacturers);
  }
}
