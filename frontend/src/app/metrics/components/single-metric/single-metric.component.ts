import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Metric } from '../../intefaces/metric.interface';
import { CaretType } from '../../enums/caret-type.enum';

@Component({
  selector: 'app-single-metric',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './single-metric.component.html',
  styleUrls: ['./single-metric.component.scss']
})
export class SingleMetricComponent {
  CaretType = CaretType;

  @Input({ required: true }) metric!: Metric;
}
