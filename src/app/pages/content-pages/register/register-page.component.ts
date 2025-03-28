import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  registerFormSubmitted = false;
  registerForm: UntypedFormGroup;
  constructor(private formBuilder: UntypedFormBuilder, private toastr: ToastrService, private router: Router, private authService: AuthService,  private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get rf() {
    return this.registerForm.controls;
  }
  signInWithGoogle() {
    this.authService.googleSignIn();
  }
  onSubmit() {
    this.registerFormSubmitted = true;
  
    if (this.registerForm.invalid) {
      return;
    }
  
    this.spinner.show(); // Show loading spinner
  
    const userData = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
  
    this.authService.signUp(userData).subscribe({
      next: (response) => {
        this.authService.setEmail(userData.email); // Store email in AuthService
        this.toastr.success('Signup successful! Please check your email for OTP.', 'Success');
        this.router.navigate(['/pages/otp']);
      },
      error: (error) => {
        this.toastr.error(error.error.message || 'Signup failed. Please try again.', 'Error');
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide(); // Hide spinner after API response
      }
    });
  }
  
  //  On submit click, reset field value
  // onSubmit() {
  //   this.registerFormSubmitted = true;
  //   if (this.registerForm.invalid) {
  //     return;
  //   }

  //   this.router.navigate(['/pages/login']);
  // }
}
