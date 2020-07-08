import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaCamereComponent } from './modifica-camere.component';

describe('ModificaCamereComponent', () => {
  let component: ModificaCamereComponent;
  let fixture: ComponentFixture<ModificaCamereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaCamereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaCamereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
