import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostraPrezziComponent } from './mostra-prezzi.component';

describe('MostraPrezziComponent', () => {
  let component: MostraPrezziComponent;
  let fixture: ComponentFixture<MostraPrezziComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostraPrezziComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostraPrezziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
