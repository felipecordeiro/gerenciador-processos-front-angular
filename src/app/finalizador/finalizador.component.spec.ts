import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizadorComponent } from './finalizador.component';

describe('FinalizadorComponent', () => {
  let component: FinalizadorComponent;
  let fixture: ComponentFixture<FinalizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
