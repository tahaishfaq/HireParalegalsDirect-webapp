import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPasswordAfterClaimParalegalComponent } from './set-password-after-claim-paralegal.component';

describe('SetPasswordAfterClaimParalegalComponent', () => {
  let component: SetPasswordAfterClaimParalegalComponent;
  let fixture: ComponentFixture<SetPasswordAfterClaimParalegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPasswordAfterClaimParalegalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPasswordAfterClaimParalegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
