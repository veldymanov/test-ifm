import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PazzleComponent } from './pazzle.component';

describe('PazzleComponent', () => {
  let component: PazzleComponent;
  let fixture: ComponentFixture<PazzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PazzleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PazzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
