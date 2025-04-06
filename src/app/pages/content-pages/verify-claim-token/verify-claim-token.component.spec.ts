import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyClaimTokenComponent } from './verify-claim-token.component';

describe('VerifyClaimTokenComponent', () => {
  let component: VerifyClaimTokenComponent;
  let fixture: ComponentFixture<VerifyClaimTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyClaimTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyClaimTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
