import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosteoComponent } from './costeo.component';

describe('CosteoComponent', () => {
  let component: CosteoComponent;
  let fixture: ComponentFixture<CosteoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CosteoComponent]
    });
    fixture = TestBed.createComponent(CosteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
