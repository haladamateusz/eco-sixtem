import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSaplingModalComponent } from './plant-sapling-modal.component';

describe('PlantSapplingComponent', () => {
  let component: PlantSaplingModalComponent;
  let fixture: ComponentFixture<PlantSaplingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlantSaplingModalComponent]
    });
    fixture = TestBed.createComponent(PlantSaplingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
