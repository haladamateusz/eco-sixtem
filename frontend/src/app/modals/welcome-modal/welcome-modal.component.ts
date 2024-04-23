import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.scss'],
  imports: [MatStepperModule, MatDialogModule, MatButtonModule],
  standalone: true
})
export class WelcomeModalComponent implements AfterViewInit {
  @ViewChild(MatStepper) stepper!: MatStepper;

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'number';
  }
}
