import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimProfileListingComponent } from './claim-profile-listing.component';

describe('ClaimProfileListingComponent', () => {
  let component: ClaimProfileListingComponent;
  let fixture: ComponentFixture<ClaimProfileListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimProfileListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimProfileListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
