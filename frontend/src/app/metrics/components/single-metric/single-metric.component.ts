import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Metric } from '../../intefaces/metric.interface';
import { EsgCaretIcon } from '../../enums/esg-caret-icon.enum';

@Component({
  selector: 'app-single-metric',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './single-metric.component.html',
  styleUrls: ['./single-metric.component.scss']
})
export class SingleMetricComponent {
  EsgCaretIcon = EsgCaretIcon;

  @Input({ required: true }) metric!: Metric;
}
