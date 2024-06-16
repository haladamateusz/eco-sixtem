import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Metric } from '../../intefaces/metric.interface';
import { MetricIcon } from '../../enums/metric-icon.enum';
import { SingleMetricComponent } from '../single-metric/single-metric.component';
import { WalletService } from '../../../shared/service/wallet/wallet.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { WalletManufacturer } from '../../../shared/model/manufacturer/wallet-manufacturer.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EsgScoreAccumulated } from '../../../shared/model/esg/esg-score.interface';

import { PropertyToAccumulate } from '../../types/property-to-accumulate.type';
import { EsgCaretIcon } from '../../enums/esg-caret-icon.enum';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, SingleMetricComponent],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent {
  walletService: WalletService = inject(WalletService);

  accumulateValues = (
    manufacturers: WalletManufacturer[],
    propertyToAccumulate: PropertyToAccumulate
  ): number => {
    const accumulatedValue = manufacturers.reduce(
      (acc: number, manufacturer: WalletManufacturer) => acc + manufacturer[propertyToAccumulate],
      0
    );
    return Math.round(accumulatedValue * 100) / 100;
  };

  revenueValue: Observable<number> = this.walletService.getManufacturers().pipe(
    takeUntilDestroyed(),
    map((manufacturers: WalletManufacturer[]) => this.accumulateValues(manufacturers, 'revenue'))
  );

  esgScoreValue: Observable<EsgScoreAccumulated> = this.walletService.getManufacturers().pipe(
    takeUntilDestroyed(),
    map(
      (manufacturers: WalletManufacturer[]): EsgScoreAccumulated => ({
        environmental: this.accumulateValues(manufacturers, 'environmental'),
        social: this.accumulateValues(manufacturers, 'social'),
        governance: this.accumulateValues(manufacturers, 'governance')
      })
    )
  );

  revenue$: Observable<Metric> = this.revenueValue.pipe(
    switchMap((revenue: number) => {
      const caretIconUrl: EsgCaretIcon = this.getCaretIcon(revenue);
      return of({
        value: revenue,
        name: 'Revenue',
        icon: MetricIcon.REVENUE,
        caret: caretIconUrl
      });
    })
  );

  esgScore$: Observable<Metric[]> = this.esgScoreValue.pipe(
    switchMap((esgScore: EsgScoreAccumulated) => {
      const environmentalCaretIconUrl: EsgCaretIcon = this.getCaretIcon(esgScore.environmental);
      const socialCaretIconUrl: EsgCaretIcon = this.getCaretIcon(esgScore.social);
      const governanceCaretIconUrl: EsgCaretIcon = this.getCaretIcon(esgScore.governance);
      return of([
        {
          value: esgScore.environmental,
          name: 'Environmental',
          icon: MetricIcon.ENVIRONMENTAL,
          caret: environmentalCaretIconUrl
        },
        {
          value: esgScore.social,
          name: 'Social',
          icon: MetricIcon.SOCIAL,
          caret: socialCaretIconUrl
        },
        {
          value: esgScore.governance,
          name: 'Governance',
          icon: MetricIcon.GOVERNANCE,
          caret: governanceCaretIconUrl
        }
      ]);
    })
  );

  getCaretIcon(value: number): EsgCaretIcon {
    if (value > 0 && value < 10) {
      return EsgCaretIcon.ONE_UP;
    }
    if (value > 10 && value < 100) {
      return EsgCaretIcon.TWO_UP;
    }
    if (value > 100) {
      return EsgCaretIcon.THREE_UP;
    }
    if (value < 0 && value > -10) {
      return EsgCaretIcon.ONE_DOWN;
    }
    if (value < -10 && value > -100) {
      return EsgCaretIcon.TWO_DOWN;
    }
    if (value < -100) {
      return EsgCaretIcon.THREE_DOWN;
    }
    return EsgCaretIcon.NO_CHANGE;
  }
}
