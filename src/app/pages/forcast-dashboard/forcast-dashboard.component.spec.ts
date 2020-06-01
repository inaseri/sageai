import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastDashboardComponent } from './forcast-dashboard.component';

describe('ForcastDashboardComponent', () => {
  let component: ForcastDashboardComponent;
  let fixture: ComponentFixture<ForcastDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcastDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcastDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
