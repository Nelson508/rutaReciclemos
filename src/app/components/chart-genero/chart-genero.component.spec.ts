import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGeneroComponent } from './chart-genero.component';

describe('ChartGeneroComponent', () => {
  let component: ChartGeneroComponent;
  let fixture: ComponentFixture<ChartGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartGeneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
