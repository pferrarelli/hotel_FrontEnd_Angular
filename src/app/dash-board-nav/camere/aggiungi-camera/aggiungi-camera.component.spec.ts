import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiCameraComponent } from './aggiungi-camera.component';

describe('AggiungiCameraComponent', () => {
  let component: AggiungiCameraComponent;
  let fixture: ComponentFixture<AggiungiCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggiungiCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
