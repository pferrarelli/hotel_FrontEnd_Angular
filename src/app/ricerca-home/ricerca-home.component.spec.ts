import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaHomeComponent } from './ricerca-home.component';

describe('RicercaHomeComponent', () => {
  let component: RicercaHomeComponent;
  let fixture: ComponentFixture<RicercaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicercaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
