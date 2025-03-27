import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
  animations: [
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class VerifyOtpComponent implements OnInit {
  verifyOtpForm: UntypedFormGroup;
  verifyOtpFormSubmitted = false;
  email!: string;
  timerRunning = false;
  timeLeft = 60; // 1 minute
  formattedTime = '01:00';
  timer: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) { this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd && event.url.includes('/pages/otp')) {
      this.cdr.detectChanges();
      this.resetTimer();

    }
  });}
  ngOnInit() {
    this.email = this.authService.getEmail();
    if (!this.email) {
      console.warn('No email found! Redirecting to register page...');
      // Redirect to register page if email is not available
      this.router.navigate(['/pages/register']);
    }
    this.verifyOtpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
    this.startTimer();
  }
  startTimer(): void {
    this.timerRunning = true;
    this.timeLeft = 60;
    this.updateFormattedTime();
  
    console.log("Timer started");
  
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateFormattedTime();
        this.cdr.detectChanges(); // Manually trigger change detection
      } else {
        this.timerRunning = false;
        clearInterval(this.timer);
        this.cdr.detectChanges(); // Ensure UI updates when timer stops
      }
    }, 1000);
  }
  
  updateFormattedTime(): void {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  get vf() {
    return this.verifyOtpForm.controls;
  }
  resetTimer(): void {
    clearInterval(this.timer);
    this.timeLeft = 60;
    this.timerRunning = true;
    this.updateFormattedTime();
    this.cdr.detectChanges(); // Force UI update
    this.startTimer();
  }
  
  // On Submit OTP
  onVerifyOtp() {
    this.verifyOtpFormSubmitted = true;

    if (this.verifyOtpForm.invalid || !this.timerRunning) {
      return;
    }

    this.spinner.show(); // Show loading spinner

    const otpData = {
      email: this.email,
      otp: this.verifyOtpForm.value.otp
    };

    this.authService.verifyOtp(otpData).subscribe({
      next: () => {
        this.toastr.success('OTP Verified Successfully!', 'Success');
        this.router.navigate(['/pages/homepage']); // Navigate to homepage
      },
      error: (error) => {
        this.toastr.error(error.error.message || 'OTP Verification Failed', 'Error');
      },
      complete: () => {
        this.spinner.hide(); // Hide loading spinner
      }
    });
  }

  // onResendOtp(): void {
  //   console.log('Resending OTP...');
  //   this.verifyOtpForm.reset();
  //   this.verifyOtpFormSubmitted = false;
  //   this.startTimer();
  // }
  onResendOtp(): void {
    console.log('Resending OTP...');
    this.verifyOtpForm.reset();
    this.verifyOtpFormSubmitted = false;
    this.startTimer();
  
    const email = this.authService.getEmail(); // Get the stored email
    if (email) {
      this.authService.resendOtp(email).subscribe({
        next: (response) => {
          console.log('OTP resent successfully:', response);
        },
        error: (error) => {
          console.error('Error resending OTP:', error);
        }
      });
    } else {
      console.error('No email found for resending OTP');
    }
  }
  

}
