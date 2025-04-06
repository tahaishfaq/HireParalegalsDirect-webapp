import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  username: string = '';
  password: string = '';
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isEditingUsername: boolean = false;
  isEditingPassword: boolean = false;
  loadingUsername: boolean = false;
  loadingPassword: boolean = false;

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.password = localStorage.getItem('savedPassword') || '';
  }
  onEditUsername() {
    this.isEditingUsername = true;
  }

  // Enable password editing
  onEditPassword() {
    this.isEditingPassword = true;
  }

  // Save new username
  onSaveUsername() {
    if (!this.username) {
      this.toastr.warning('Username cannot be empty.');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('User is not authenticated.');
      return;
    }
  
    this.loadingUsername = true; // Start loading
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    const url = `${environment.apiUrl}/users/update-username`;
  
    this.http.put(url, { newUsername: this.username }, { headers }).subscribe({
      next: () => {
        localStorage.setItem('username', this.username);
        this.toastr.success('Username updated successfully!');
        this.loadingUsername = false;
        this.isEditingUsername = false;
        window.location.reload(); // Reload the page
      },
      error: () => {
        this.toastr.error('Failed to update username.');
        this.loadingUsername = false;
      }
    });
  }
  
  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }
  
  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }
  
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  // Cancel username edit
  onCancelUsername() {
    this.username = localStorage.getItem('username') || '';
    this.isEditingUsername = false;
  }

  // Save new password (validate fields)
  onSavePassword() {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      this.toastr.warning('Please fill in all password fields.');
      return;
    }
  
    if (this.newPassword !== this.confirmPassword) {
      this.toastr.error('New Password and Confirm Password do not match!');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('User is not authenticated.');
      return;
    }
  
    this.loadingPassword = true;
  
    const url = `${environment.apiUrl}/users/update-password`;
    const body = {
      currentPassword: this.oldPassword,
      newPassword: this.newPassword
    };
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.put(url, body, { headers }).subscribe({
      next: () => {
        this.toastr.success('Password updated successfully!');
        this.isEditingPassword = false;
  
        // Clear fields
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
  
        this.loadingPassword = false;
        window.location.reload();
      },
      error: () => {
        this.toastr.error('Failed to update password. Please try again.');
        this.loadingPassword = false;
      }
    });
  }
  
  

  // Cancel password edit
  onCancelPassword() {
    this.isEditingPassword = false;
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
