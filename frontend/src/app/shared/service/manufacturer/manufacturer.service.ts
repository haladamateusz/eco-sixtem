import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manufacturer } from '../../model/manufacturer/manufacturer.interface';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  httpClient: HttpClient = inject(HttpClient);

  getManufacturers(): Observable<Manufacturer[]> {
    return this.httpClient.get<Manufacturer[]>('http://localhost:5000/manufacturers');
  }

  getEndOfDayHistory(isin_bc: string): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:5000/manufacturers/${isin_bc}/end_of_day_history`
    );
  }

  getRevenue(isin_bc: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:5000/manufacturers/${isin_bc}/revenue`);
  }

  getIntradaySnapshot(isin_bc: string): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:5000/manufacturers/${isin_bc}/intraday_snapshot`
    );
  }
}
