import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultLandingComponent } from './result-landing.component';

describe('ResultLandingComponent', () => {
  let component: ResultLandingComponent;
  let fixture: ComponentFixture<ResultLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
