import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCercaComponent } from './home-cerca.component';

describe('HomeCercaComponent', () => {
  let component: HomeCercaComponent;
  let fixture: ComponentFixture<HomeCercaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCercaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
