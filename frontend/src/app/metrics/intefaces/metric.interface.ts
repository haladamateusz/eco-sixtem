import { MetricIcon } from '../enums/metric-icon.enum';
import { CaretType } from '../enums/caret-type.enum';

export interface Metric {
  value: number;
  icon: MetricIcon;
  name: string;
  caret: CaretType;
}
