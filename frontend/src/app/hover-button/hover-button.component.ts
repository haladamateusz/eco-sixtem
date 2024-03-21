import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hover-button',
  templateUrl: './hover-button.component.html',
  styleUrls: ['./hover-button.component.scss'],
  standalone: true
})
export class HoverButtonComponent {
  isHovered: boolean = false;
  @Output() buttonClicked = new EventEmitter<void>();

  toggleHover(hovered: boolean) {
    this.isHovered = hovered;
  }
}
