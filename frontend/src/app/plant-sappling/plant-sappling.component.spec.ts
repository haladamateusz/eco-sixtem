import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSapplingComponent } from './plant-sappling.component';

describe('PlantSapplingComponent', () => {
  let component: PlantSapplingComponent;
  let fixture: ComponentFixture<PlantSapplingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlantSapplingComponent]
    });
    fixture = TestBed.createComponent(PlantSapplingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
