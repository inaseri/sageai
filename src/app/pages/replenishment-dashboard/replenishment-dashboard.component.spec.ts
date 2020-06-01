import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplenishmentDashboardComponent } from './replenishment-dashboard.component';

describe('ReplenishmentDashboardComponent', () => {
  let component: ReplenishmentDashboardComponent;
  let fixture: ComponentFixture<ReplenishmentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplenishmentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
