import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-join-modal',
  templateUrl: './join-modal.component.html',
  styleUrls: ['./join-modal.component.scss']
})
export class JoinModalComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreedToTerms: boolean = false;
  loading: boolean = false;
  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService,  private authService: AuthService,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }
  // onSignUp(): void {
  //   if (!this.fullName || !this.email || !this.password || !this.confirmPassword || !this.agreedToTerms) {
  //     this.toastr.warning('Please fill in all fields and accept the Terms & Conditions', 'Warning');
  //     return;
  //   }

  //   if (this.password !== this.confirmPassword) {
  //     this.toastr.error('Passwords do not match', 'Error');
  //     return;
  //   }

  //   this.spinner.show(); // Show spinner before API call

  //   this.authService.signUp(this.fullName, this.email, this.password).subscribe({
  //     next: (response) => {
  //       this.toastr.success(`OTP sent to ${this.email}`, 'Success');
  //     },
  //     error: (err) => {
  //       this.toastr.error('Sign-up failed, please try again', 'Error');
  //       console.error(err);
  //     },
  //     complete: () => {
  //       this.spinner.hide(); // Hide spinner after API response
  //     }
  //   });
  // }
}
