import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogRef } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs";

@Component({
  selector: 'app-plant-sappling',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './plant-sappling.component.html',
  styleUrls: ['./plant-sappling.component.scss'],
})
export class PlantSapplingComponent implements OnInit {
  dialog = inject(MatDialogRef<PlantSapplingComponent>);

  http = inject(HttpClient);

  sapling = '';

  companies = []

  ngOnInit() {
    this.http.get('http://localhost:5000/company-names').pipe(first()).subscribe((data: any) => {
      this.companies = data;
    });
  }

  onClose(): void {
    this.dialog.close(this.sapling);
  }
}
