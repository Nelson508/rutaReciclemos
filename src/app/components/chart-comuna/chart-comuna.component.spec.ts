import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComunaComponent } from './chart-comuna.component';

describe('ChartComunaComponent', () => {
  let component: ChartComunaComponent;
  let fixture: ComponentFixture<ChartComunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartComunaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
