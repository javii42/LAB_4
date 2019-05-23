import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRelacionComponent } from './lista-relacion.component';

describe('ListaRelacionComponent', () => {
  let component: ListaRelacionComponent;
  let fixture: ComponentFixture<ListaRelacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRelacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
