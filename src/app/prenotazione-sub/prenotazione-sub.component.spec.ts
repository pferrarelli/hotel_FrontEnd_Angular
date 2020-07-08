import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioneSubComponent } from './prenotazione-sub.component';

describe('PrenotazioneSubComponent', () => {
  let component: PrenotazioneSubComponent;
  let fixture: ComponentFixture<PrenotazioneSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrenotazioneSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotazioneSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
