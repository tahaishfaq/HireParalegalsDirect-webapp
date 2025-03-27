import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimProfileSearchComponent } from './claim-profile-search.component';

describe('ClaimProfileSearchComponent', () => {
  let component: ClaimProfileSearchComponent;
  let fixture: ComponentFixture<ClaimProfileSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimProfileSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimProfileSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
