import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPersonasComponent } from './chart-personas.component';

describe('ChartPersonasComponent', () => {
  let component: ChartPersonasComponent;
  let fixture: ComponentFixture<ChartPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPersonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
