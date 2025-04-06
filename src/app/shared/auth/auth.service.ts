import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app'
import { BehaviorSubject, Observable } from 'rxjs';
// import { API_URL2 } from 'app/utils/api.token';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
export interface AuthState {
  userId?: string | null;
  access_token?: string | null;
  name?: string | null;
  role?: string | null;
  username?: string | null;
}

export const initialState: AuthState = {
  userId: null,
  access_token: null,
  name: null,
  role: null,
  username: null
};
@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: any[] = [];
  private authState = new BehaviorSubject<AuthState>(this.getLocalState());
  public auth$ = this.authState.asObservable().pipe(distinctUntilChanged());
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private apiUrl = environment.apiUrl; 
  private userEmail: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService

  ) {

this.loadUsers();
  }
  private loadUsers(): void {
    this.http.get<any[]>('/assets/users.json').subscribe((data) => {
      this.users = data;
    });
  }
  async googleSignIn() {
    try {
      const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.toastr.success('Google Sign-in successful!', 'Success 🎉');
      console.log('Google Sign-in success:', result);
    } catch (error) {
      this.toastr.error('Google Sign-in failed. Please try again.', 'Error ❌');
      console.error('Google Sign-in error:', error);
    }
  }
  storeGoogleAuthToken(token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedIn', 'true');
  
    // Decode JWT (optional, if you want user details)
    const payload = this.decodeToken(token);
    const authData: AuthState = {
      userId: payload?.id || null,
      access_token: token,
      name: payload?.name || null,
      role: payload?.role || 'user'
    };
  
    localStorage.setItem('auth', JSON.stringify(authData));
    this.authState.next(authData);
    this.isLoggedInSubject.next(true);
  
    window.dispatchEvent(new Event('userLoggedIn')); // Notify UI updates
  }
  
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    } catch (e) {
      console.error('Invalid Token', e);
      return null;
    }
  }
  signUp(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/signup`, userData);
  }
  verifyOtp(otpData: { email: string, otp: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/verify-otp`, otpData);
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          this.storeAuthData(response);

        }
        console.log(response);
      })
    );
  }
  setEmail(email: string): void {
    this.userEmail = email;
  }

  getEmail(): string {
    return this.userEmail;
  }

  clearEmail(): void {
    this.userEmail = '';
  }
  private storeAuthData(response: any): void {
    const authData: AuthState = {
      userId: response.user._id,
      access_token: response.token,
      name: response.user.name,
      role: response.user.role
    };

    localStorage.setItem('auth', JSON.stringify(authData));
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.user.name);
    localStorage.setItem('role', response.user.role);
    localStorage.setItem('isLoggedIn', 'true');

    this.authState.next(authData);
    this.isLoggedInSubject.next(true);
    window.dispatchEvent(new Event('userLoggedIn')); // Notify UI updates
  }
  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    // localStorage.removeItem('savedEmail');
    // localStorage.removeItem('savedPassword');
    localStorage.removeItem('selectedParalegal');
    localStorage.setItem('isLoggedIn', 'false');

    this.authState.next(initialState);
    this.isLoggedInSubject.next(false);
    window.dispatchEvent(new Event('userLoggedOut'));

    this.router.navigate(['/pages/homepage']);
  }
  getLoggedInUser(): AuthState | null {
    return this.getLocalState();
  }
  private checkLoginStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  private getLocalState(): AuthState {
    const localState = localStorage.getItem('auth');
    const username = localStorage.getItem('username');
    return localState ? (JSON.parse(localState) as AuthState) : initialState;
  }
  resendOtp(email: string): Observable<any> {
    const payload = { email };
    return this.http.post(`${this.apiUrl}/users/resend-otp`, payload).pipe(
      tap(response => {
        console.log('OTP Resent Successfully:', response);
      })
    );
  }
  
}
