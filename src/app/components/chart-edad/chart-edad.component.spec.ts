import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEdadComponent } from './chart-edad.component';

describe('ChartEdadComponent', () => {
  let component: ChartEdadComponent;
  let fixture: ComponentFixture<ChartEdadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartEdadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartEdadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
