import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfographicComponent } from './infographic.component';

describe('InfographicComponent', () => {
  let component: InfographicComponent;
  let fixture: ComponentFixture<InfographicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfographicComponent]
    });
    fixture = TestBed.createComponent(InfographicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
