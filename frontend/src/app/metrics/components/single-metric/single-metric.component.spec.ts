import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMetricComponent } from './single-metric.component';

describe('SingleMetricComponent', () => {
  let component: SingleMetricComponent;
  let fixture: ComponentFixture<SingleMetricComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SingleMetricComponent]
    });
    fixture = TestBed.createComponent(SingleMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
