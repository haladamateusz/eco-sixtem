import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManufacturerDto } from '../../model/dto/manufacturer.dto';
import { RevenueDto } from '../../model/dto/revenue.dto';
import { EsgScoreDto } from '../../model/dto/esg-score.dto';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  httpClient: HttpClient = inject(HttpClient);

  getManufacturers(): Observable<ManufacturerDto[]> {
    return this.httpClient.get<ManufacturerDto[]>('http://localhost:5000/manufacturers');
  }

  getManufacturerRevenue(isin_bc: string): Observable<RevenueDto> {
    return this.httpClient.get<RevenueDto>(
      `http://localhost:5000/manufacturers/${isin_bc}/revenue`
    );
  }

  getManufacturerEsgScore(isin_bc: string): Observable<EsgScoreDto> {
    return this.httpClient.get<EsgScoreDto>(`http://localhost:5000/manufacturers/${isin_bc}/esg`);
  }
}
