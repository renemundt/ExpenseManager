import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitSystemComponent } from './init-system.component';

describe('InitSystemComponent', () => {
  let component: InitSystemComponent;
  let fixture: ComponentFixture<InitSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
