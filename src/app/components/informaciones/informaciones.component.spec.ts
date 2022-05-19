import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionesComponent } from './informaciones.component';

describe('InformacionesComponent', () => {
  let component: InformacionesComponent;
  let fixture: ComponentFixture<InformacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
