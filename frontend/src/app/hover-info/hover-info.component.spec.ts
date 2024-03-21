import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverInfoComponent } from './hover-info.component';

describe('HoverInfoComponent', () => {
  let component: HoverInfoComponent;
  let fixture: ComponentFixture<HoverInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoverInfoComponent]
    });
    fixture = TestBed.createComponent(HoverInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
