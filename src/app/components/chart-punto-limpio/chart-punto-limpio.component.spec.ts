import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPuntoLimpioComponent } from './chart-punto-limpio.component';

describe('ChartPuntoLimpioComponent', () => {
  let component: ChartPuntoLimpioComponent;
  let fixture: ComponentFixture<ChartPuntoLimpioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPuntoLimpioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPuntoLimpioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
