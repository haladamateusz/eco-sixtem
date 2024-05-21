import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Metric } from '../../intefaces/metric.interface';
import { MetricIcon } from '../../enums/metric-icon.enum';
import { CaretType } from '../../enums/caret-type.enum';
import { SingleMetricComponent } from '../single-metric/single-metric.component';
import { WalletService } from '../../../shared/service/wallet/wallet.service';
import { map, Observable } from 'rxjs';
import { WalletManufacturer } from '../../../shared/model/manufacturer/wallet-manufacturer.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, SingleMetricComponent],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent {
  walletService: WalletService = inject(WalletService);

  revenue$: Observable<Metric> = this.walletService.getManufacturers().pipe(
    takeUntilDestroyed(),
    map(
      (manufacturers: WalletManufacturer[]): Metric => ({
        icon: MetricIcon.REVENUE,
        caret: CaretType.ONE_UP,
        name: 'Revenue',
        value: manufacturers.reduce(
          (acc: number, manufacturer: WalletManufacturer) => acc + manufacturer.revenue,
          0
        )
      })
    )
  );

  esgMetrics: Metric[] = [
    {
      value: 120,
      name: 'Environmental',
      icon: MetricIcon.ENVIRONMENTAL,
      caret: CaretType.TWO_DOWN
    },
    {
      value: 340,
      name: 'Social',
      icon: MetricIcon.SOCIAL,
      caret: CaretType.THREE_UP
    },
    {
      value: 340,
      name: 'Governance',
      icon: MetricIcon.GOVERNANCE,
      caret: CaretType.ONE_UP
    }
  ];
}
