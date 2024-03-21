import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from "@angular/material/stepper";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
  imports: [MatStepperModule, MatDialogModule, MatButtonModule],
  standalone: true,
})
export class ModalWrapperComponent implements AfterViewInit {
  @ViewChild(MatStepper) stepper!: MatStepper;

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'number';
  }
}
