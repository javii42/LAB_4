import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarModeloComponent } from './buscar-modelo.component';

describe('BuscarModeloComponent', () => {
  let component: BuscarModeloComponent;
  let fixture: ComponentFixture<BuscarModeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarModeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
