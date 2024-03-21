import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: 'app-plant-sappling',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatSelectModule],
  templateUrl: './plant-sappling.component.html',
  styleUrls: ['./plant-sappling.component.scss'],
})
export class PlantSapplingComponent {}
