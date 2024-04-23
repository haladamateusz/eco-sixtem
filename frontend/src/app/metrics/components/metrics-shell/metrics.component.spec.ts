import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsComponent } from './metrics.component';

describe('MetricsComponent', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MetricsComponent]
    });
    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
