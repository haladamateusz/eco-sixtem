import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-infographic',
  templateUrl: './infographic.component.html',
  styleUrls: ['./infographic.component.scss'],
  standalone: true
})
export class InfographicComponent {
  @Input() environmental = '';
  @Input() social = '';
  @Input() governance = '';
  @Input() revenue = '';


}
