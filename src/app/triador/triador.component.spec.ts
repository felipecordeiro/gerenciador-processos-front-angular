import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriadorComponent } from './triador.component';

describe('TriadorComponent', () => {
  let component: TriadorComponent;
  let fixture: ComponentFixture<TriadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
