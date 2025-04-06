import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    @ViewChild('f') forogtPasswordForm: NgForm;
    email: string = '';
    constructor(private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private http: HttpClient) { }

        ngOnInit() {
            // Get the email from the query parameter
            this.route.queryParams.subscribe(params => {
                if (params['email']) {
                    this.email = params['email'];
                }
            });
        }

    // On submit click, reset form fields
    onSubmit() {
        this.forogtPasswordForm.reset();
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
    sendForgotPasswordRequest() {
        if (!this.email) {
            this.toastr.warning('Please enter your email!', 'Warning');
          return;
        }
    
        const apiUrl = `${environment.apiUrl}/users/forgot-password`;
    
        this.http.post(apiUrl, { email: this.email }).subscribe({
          next: (response) => {
            console.log('Forgot password email sent:', response);
            this.toastr.success('A password reset email has been sent. Please check your inbox.', 'Success');

    
            // Navigate to Verify OTP component with email as query param
            this.router.navigate(['/pages/verify-forgotPassword-otp'], { queryParams: { email: this.email } });
          },
          error: (error) => {
            console.error('Error sending forgot password request:', error);
            this.router.navigate(['/pages/verify-forgotPassword-otp'], { queryParams: { email: this.email } });
            this.toastr.error('Unable to send reset email. Please try again.', 'Error');
          }
        });
      }
}
