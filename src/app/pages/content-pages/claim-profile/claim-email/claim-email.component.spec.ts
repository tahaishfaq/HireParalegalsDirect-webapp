import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEmailComponent } from './claim-email.component';

describe('ClaimEmailComponent', () => {
  let component: ClaimEmailComponent;
  let fixture: ComponentFixture<ClaimEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
