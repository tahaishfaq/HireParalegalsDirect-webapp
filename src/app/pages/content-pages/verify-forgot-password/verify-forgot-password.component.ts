import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-forgot-password',
  templateUrl: './verify-forgot-password.component.html',
  styleUrls: ['./verify-forgot-password.component.scss'],
  animations: [
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class VerifyForgotPasswordComponent implements OnInit {
  email: string = '';
  otp: string = '';
  isOtpVerified: boolean = false;


  newPassword: string = '';
  confirmPassword: string = '';

  // Toggle visibility
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  resetToken: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
      } else {
        this.toastr.error('Missing email parameter.', 'Error');
        this.router.navigate(['/pages/forgot-password']);
      }
    });
  }

  verifyOtp() {
    if (!this.otp) {
      this.toastr.warning('Please enter the OTP.', 'Warning');
      return;
    }
  
    const apiUrl = `${environment.apiUrl}/users/verify-forgot-password-otp`;
  
    this.http.post(apiUrl, { email: this.email, otp: this.otp }).subscribe({
      next: (response: any) => {
        this.toastr.success('OTP Verified Successfully!', 'Success');
        this.resetToken = response.resetToken;
  
        this.isOtpVerified = true;
        this.cdr.markForCheck(); // Force change detection
      },
      error: (err) => {
        this.toastr.error('Invalid OTP or verification failed.', 'Error');
        console.error(err);
      }
    });
  }
  

  resetPassword() {
    if (!this.newPassword) {
      this.toastr.warning('Password is required.', 'Warning');
      return;
    }
  
    if (this.newPassword.length < 8) {
      this.toastr.error('Password must be at least 8 characters.', 'Error');
      return;
    }
  
    const apiUrl = `${environment.apiUrl}/users/reset-password`;
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.resetToken}`
    });
  
    const payload = { newPassword: this.newPassword };
  
    this.http.post(apiUrl, payload, { headers }).subscribe({
      next: () => {
        this.toastr.success('Password reset successfully!', 'Success');
        this.router.navigate(['/pages/homepage']);
      },
      error: (err) => {
        this.toastr.error('Password reset failed.', 'Error');
        console.error(err);
      }
    });
  }
  

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
