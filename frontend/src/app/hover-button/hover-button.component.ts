import { Component } from '@angular/core';

@Component({
  selector: 'app-hover-button',
  templateUrl: './hover-button.component.html',
  styleUrls: ['./hover-button.component.scss']
})
export class HoverButtonComponent {
  isHovered: boolean = false;

  toggleHover(hovered: boolean) {
    this.isHovered = hovered;
  }
}
