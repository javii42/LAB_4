import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonClienteComponent } from './boton-cliente.component';

describe('BotonClienteComponent', () => {
  let component: BotonClienteComponent;
  let fixture: ComponentFixture<BotonClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
