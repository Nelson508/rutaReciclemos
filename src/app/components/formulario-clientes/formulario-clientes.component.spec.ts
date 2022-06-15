import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioClientesComponent } from './formulario-clientes.component';

describe('FormularioClientesComponent', () => {
  let component: FormularioClientesComponent;
  let fixture: ComponentFixture<FormularioClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
