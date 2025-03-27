import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-sale-ticket',
  templateUrl: './contact-sale-ticket.component.html',
  styleUrls: ['./contact-sale-ticket.component.scss']
})
export class ContactSaleTicketComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;

    if (this.contactForm.invalid) {
      this.isLoading = false;
      return;
    }

    const formData = this.contactForm.value;
    const apiUrl = `${environment.apiUrl}/lawyers/contact-sales`;

    this.http.post(apiUrl, formData).subscribe(
      (response) => {
        this.toastr.success('Your request has been submitted!', 'Success');
        this.router.navigate(['/pages/homepage']);
      },
      (error) => {
        this.toastr.error('Failed to submit request. Please try again.', 'Error');
      }
    ).add(() => this.isLoading = false); // Ensures loading stops in all cases
  }

}
