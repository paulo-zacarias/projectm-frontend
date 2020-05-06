import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvatarListComponent } from './user-avatar-list.component';

describe('UserAvatarListComponent', () => {
  let component: UserAvatarListComponent;
  let fixture: ComponentFixture<UserAvatarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAvatarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAvatarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
