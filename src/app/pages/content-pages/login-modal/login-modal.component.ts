import { Component, OnInit } from '@angular/core';
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

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

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
        console.error(err);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  dismiss() {
    this.activeModal.dismiss(); // Closes the modal
  }
}
