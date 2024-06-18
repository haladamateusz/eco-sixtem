import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAssetComponent } from './single-asset.component';

describe('SingleAssetComponent', () => {
  let component: SingleAssetComponent;
  let fixture: ComponentFixture<SingleAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleAssetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
