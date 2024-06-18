import { MetricIcon } from '../enums/metric-icon.enum';
import { EsgCaretIcon } from '../enums/esg-caret-icon.enum';

export interface Metric {
  value: number;
  icon: MetricIcon;
  name: string;
  caret: EsgCaretIcon;
}
