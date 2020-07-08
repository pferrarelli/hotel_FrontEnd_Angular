import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostraTutteComponent } from './mostra-tutte.component';

describe('MostraTutteComponent', () => {
  let component: MostraTutteComponent;
  let fixture: ComponentFixture<MostraTutteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostraTutteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostraTutteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
