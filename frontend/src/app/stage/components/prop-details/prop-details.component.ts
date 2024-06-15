import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prop-details',
  standalone: true,
  imports: [],
  templateUrl: './prop-details.component.html',
  styleUrl: './prop-details.component.scss'
})
export class PropDetailsComponent {
  @Input() name: string = 'default';
}
