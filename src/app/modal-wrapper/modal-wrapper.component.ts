import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements AfterViewInit {
  @ViewChild(MatStepper) stepper!: MatStepper;

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'number';
  }
}
