import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  email: string = '';
  password: string = '';

  // private readonly adminEmail = 'hireparalegaladmin@hpd.com';
  // private readonly adminPassword = '123456';
  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService,  private authService: AuthService) { }

  ngOnInit(): void {
  }
  // onLogin(): void {
  //   if (!this.authService.login(this.email, this.password)) {
  //     if (this.email !== 'hireparalegaladmin@hpd.com') {
  //       this.toastr.error('User does not exist', 'Error');
  //     } else {
  //       this.toastr.error('Wrong password', 'Error');
  //     }
  //     return;
  //   }

  //   this.toastr.success('User successfully logged in', 'Success');


  //   localStorage.setItem('isLoggedIn', 'true');


  //   window.dispatchEvent(new Event('userLoggedIn'));
  //   this.activeModal.dismiss();
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 500); 
  // }

  onLogin(): void {
    const userName = this.authService.login(this.email, this.password);
  
    if (!userName) {
      this.toastr.error('Invalid email or password', 'Error');
      return;
    }
  
    this.toastr.success(`${userName} successfully logged in`, 'Success');
    this.activeModal.dismiss();
  
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  
  dismiss() {
    this.activeModal.dismiss(); // Closes the modal
  }

}
