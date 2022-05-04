import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVentasComponent } from './chart-ventas.component';

describe('ChartVentasComponent', () => {
  let component: ChartVentasComponent;
  let fixture: ComponentFixture<ChartVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
