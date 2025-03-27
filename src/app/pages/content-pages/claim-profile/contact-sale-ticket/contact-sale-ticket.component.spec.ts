import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSaleTicketComponent } from './contact-sale-ticket.component';

describe('ContactSaleTicketComponent', () => {
  let component: ContactSaleTicketComponent;
  let fixture: ComponentFixture<ContactSaleTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactSaleTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactSaleTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
