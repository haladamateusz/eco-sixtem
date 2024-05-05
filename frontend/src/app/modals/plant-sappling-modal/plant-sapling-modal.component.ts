import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { ManufacturerService } from '../../shared/service/manufacturer/manufacturer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Manufacturer } from '../../shared/model/manufacturer/manufacturer.interface';

@Component({
  selector: 'app-plant-sapling-modal',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatSelectModule, FormsModule, MatButtonModule],
  templateUrl: './plant-sapling-modal.component.html',
  styleUrls: ['./plant-sapling-modal.component.scss']
})
export class PlantSaplingModalComponent {
  companyService: ManufacturerService = inject(ManufacturerService);

  dialog: MatDialogRef<PlantSaplingModalComponent> = inject(
    MatDialogRef<PlantSaplingModalComponent>
  );

  sapling = '';

  manufacturers$: Observable<Manufacturer[]> = this.companyService
    .getManufacturers()
    .pipe(takeUntilDestroyed());

  onClose(): void {
    this.dialog.close(this.sapling);
  }
}
