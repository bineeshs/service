import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPermissionsComponent } from './company-permissions.component';

describe('CompanyPermissionsComponent', () => {
  let component: CompanyPermissionsComponent;
  let fixture: ComponentFixture<CompanyPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyPermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
