import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Metric } from '../../intefaces/metric.interface';
import { MetricIcon } from '../../enums/metric-icon.enum';
import { CaretType } from '../../enums/caret-type.enum';
import { SingleMetricComponent } from '../single-metric/single-metric.component';
import { WalletService } from '../../../shared/service/wallet/wallet.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { WalletManufacturer } from '../../../shared/model/manufacturer/wallet-manufacturer.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EsgScoreAccumulated } from '../../../shared/model/esg/esg-score.interface';
import { PropertyToAccumulate } from '../../types/property-to-accumulate.type';

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
  ) =>
    manufacturers.reduce(
      (acc: number, manufacturer: WalletManufacturer) => acc + manufacturer[propertyToAccumulate],
      0
    );

  revenueValue: Observable<number> = this.walletService.getManufacturers().pipe(
    takeUntilDestroyed(),
    map((manufacturers: WalletManufacturer[]) => this.accumulateValues(manufacturers, 'revenue'))
  );

  esgScoreValue: Observable<EsgScoreAccumulated> = this.walletService.getManufacturers().pipe(
    takeUntilDestroyed(),
    map((manufacturers: WalletManufacturer[]) => ({
      environmental: this.accumulateValues(manufacturers, 'environmental'),
      social: this.accumulateValues(manufacturers, 'social'),
      governance: this.accumulateValues(manufacturers, 'governance')
    }))
  );

  revenue$: Observable<Metric> = this.revenueValue.pipe(
    switchMap((revenue: number) => {
      const caretValue: CaretType = this.calculateCaretIcon(revenue);
      return of({
        value: revenue,
        name: 'Revenue',
        icon: MetricIcon.REVENUE,
        caret: caretValue
      });
    })
  );

  esgScore$: Observable<Metric[]> = this.esgScoreValue.pipe(
    switchMap((esgScore: EsgScoreAccumulated) => {
      const environmentalCaret: CaretType = this.calculateCaretIcon(esgScore.environmental);
      const socialCaret: CaretType = this.calculateCaretIcon(esgScore.social);
      const governanceCaret: CaretType = this.calculateCaretIcon(esgScore.governance);
      return of([
        {
          value: esgScore.environmental,
          name: 'Environmental',
          icon: MetricIcon.ENVIRONMENTAL,
          caret: environmentalCaret
        },
        {
          value: esgScore.social,
          name: 'Social',
          icon: MetricIcon.SOCIAL,
          caret: socialCaret
        },
        {
          value: esgScore.governance,
          name: 'Governance',
          icon: MetricIcon.GOVERNANCE,
          caret: governanceCaret
        }
      ]);
    })
  );

  calculateCaretIcon(value: number): CaretType {
    if (value > 0 && value < 10) {
      return CaretType.ONE_UP;
    }
    if (value > 10 && value < 100) {
      return CaretType.TWO_UP;
    }
    if (value > 100) {
      return CaretType.THREE_UP;
    }
    if (value < 0 && value > -10) {
      return CaretType.ONE_DOWN;
    }
    if (value < -10 && value > -100) {
      return CaretType.TWO_DOWN;
    }
    if (value < -100) {
      return CaretType.THREE_DOWN;
    }
    return CaretType.NO_CHANGE;
  }
}
