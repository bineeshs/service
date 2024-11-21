import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpServiceComponent } from './follow-up-service.component';

describe('FollowUpServiceComponent', () => {
  let component: FollowUpServiceComponent;
  let fixture: ComponentFixture<FollowUpServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUpServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
