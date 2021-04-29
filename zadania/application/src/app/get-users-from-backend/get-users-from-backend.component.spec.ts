import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUsersFromBackendComponent } from './get-users-from-backend.component';

describe('GetUsersFromBackendComponent', () => {
  let component: GetUsersFromBackendComponent;
  let fixture: ComponentFixture<GetUsersFromBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetUsersFromBackendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUsersFromBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
