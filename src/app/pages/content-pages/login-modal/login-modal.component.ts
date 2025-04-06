import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  rememberMe: boolean = false;
  showPassword: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      this.email = savedEmail;
      this.password = savedPassword;
      this.rememberMe = true;
    }
  }

  onLogin(): void {
    if (!this.email || !this.password) {
      this.toastr.warning('Please enter both email and password', 'Warning');
      return;
    }

    this.spinner.show();
    
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.toastr.success(`${response.user.name} successfully logged in`, 'Success');
        this.activeModal.dismiss(); // Close modal

        setTimeout(() => {
          window.location.reload(); // Refresh page to update UI state
        }, 500);
      },
      error: (err) => {
        this.toastr.error('Invalid email or password', 'Error');
        this.spinner.hide();
        console.error(err);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }
  onRememberMe() {
    if (this.rememberMe) {
      localStorage.setItem('savedEmail', this.email);
      localStorage.setItem('savedPassword', this.password);
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  navigateToForgotPassword() {
    if (this.email) {
      this.router.navigate(['/pages/forgotpassword'], { queryParams: { email: this.email } });
    } else {
      this.router.navigate(['/pages/forgotpassword']);
    }
    this.dismiss(); // Close the modal
  }
  dismiss() {
    this.activeModal.dismiss(); // Closes the modal
  }
  signInWithGoogle(): void {
    const googleAuthUrl = 'https://hire-paralegal.vercel.app/auth/google';
    window.open(googleAuthUrl, '_blank');
  }
  
}
