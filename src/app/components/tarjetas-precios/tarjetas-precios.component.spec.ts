import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasPreciosComponent } from './tarjetas-precios.component';

describe('TarjetasPreciosComponent', () => {
  let component: TarjetasPreciosComponent;
  let fixture: ComponentFixture<TarjetasPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetasPreciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetasPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
