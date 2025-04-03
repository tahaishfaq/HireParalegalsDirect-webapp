import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  username: string = '';
  password: string = '';

  isEditingUsername: boolean = false;
  isEditingPassword: boolean = false;

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  constructor() { }

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
    localStorage.setItem('username', this.username);
    this.isEditingUsername = false;
  }

  // Cancel username edit
  onCancelUsername() {
    this.username = localStorage.getItem('username') || '';
    this.isEditingUsername = false;
  }

  // Save new password (validate fields)
  onSavePassword() {
    if (this.newPassword === this.confirmPassword) {
      localStorage.setItem('password', this.newPassword);
      this.isEditingPassword = false;
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    } else {
      alert('New Password and Confirm Password must match!');
    }
  }

  // Cancel password edit
  onCancelPassword() {
    this.isEditingPassword = false;
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
