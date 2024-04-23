import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Metric } from '../../intefaces/metric.interface';
import { MetricIcon } from '../../enums/metric-icon.enum';
import { CaretType } from '../../enums/caret-type.enum';
import { SingleMetricComponent } from '../single-metric/single-metric.component';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, SingleMetricComponent],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent {
  revenue: Metric = {
    value: 240,
    name: 'revenue',
    icon: MetricIcon.REVENUE,
    caret: CaretType.TWO_UP
  };

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
