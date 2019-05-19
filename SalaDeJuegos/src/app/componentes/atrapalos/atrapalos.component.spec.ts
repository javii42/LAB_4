import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtrapalosComponent } from './atrapalos.component';

describe('AtrapalosComponent', () => {
  let component: AtrapalosComponent;
  let fixture: ComponentFixture<AtrapalosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtrapalosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtrapalosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
