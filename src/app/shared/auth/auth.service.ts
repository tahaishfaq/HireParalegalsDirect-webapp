import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app'
import { BehaviorSubject, Observable } from 'rxjs';
// import { API_URL2 } from 'app/utils/api.token';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
export interface AuthState {
  userId?: string | null | undefined;
  access_token?: string | null | undefined;
  token_type?: string | null | undefined;
  expires_at?: string | null | undefined;
  name?: string | null | undefined;
  role?: string | null | undefined;
  shopid?: string | null | undefined;
  actualshop?: string | null | undefined;
  usergroupid?: string | null | undefined;
  shiftid?: string | null | undefined;
  CompanyID?: string | null | undefined;
  // admin, manager, economist, user
}
export interface Credentials {
  username?: string | null | undefined;
  password?: string | null | undefined;
  remember?: boolean | null | undefined;
}
export interface User {
  id?: any;
  name: any;
  email: any;
  role: any;
  userId: any;
  photo: any | null;

  user_shift: {
    id: any;
    user_id: any;
    shift_id: any;
    shift: {
      id: any;
      name: any;
    };
  } | null;
}
export interface LoginResponse {
  status: any;
  userId?: string | null | undefined;
  access_token?: string | null | undefined;
  token_type?: string | null | undefined;
  name?: string | null | undefined;
  expires_at?: string | null | undefined;
  role?: string | null | undefined;
  usergroupid?: string | null | undefined;
  shopid?: string | null | undefined; // admin; manager; economist; user
  user?:User
}

export const initialState: AuthState = {
  userId: null,
  access_token: null,
  token_type: null,
  expires_at: null,
  name: null,
  role: null,
  shopid: null,
  actualshop: null,
  usergroupid: null,
  shiftid: null,
  CompanyID:null,
};
export interface CreateAdminPayload {
  email?: string | null | undefined;
  password?: string | null | undefined;
  password_confirmation?: string | null | undefined;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: any[] = [];
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
    // private readonly adminEmail = 'hireparalegaladmin@hpd.com';
    // private readonly adminPassword = '123456';
  constructor(
    // @Inject(API_URL2) private api: string,
    private http: HttpClient,
    private router: Router

  ) {

this.loadUsers();
  }

  private loadUsers(): void {
    this.http.get<any[]>('/assets/users.json').subscribe((data) => {
      this.users = data;
    });
  }

  login(email: string, password: string): string | null {
    const user = this.users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return user.name; // Return the name of the logged-in user
    }
    return null;
  }
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    this.isLoggedInSubject.next(false); // Notify navbar to update UI
  }
  getLoggedInUser(): any {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }
  checkLoginStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  private auth = new BehaviorSubject<AuthState>(this.getLocalState());
  public auth$ = this.auth.asObservable().pipe(distinctUntilChanged());

  get state(): AuthState {
    return this.auth.getValue();
  }

  get role(): string | null | undefined | undefined {
    return this.state.role;
  }



  public getLocalState(): AuthState {
    const localState = localStorage.getItem('auth');
    if (localState) {
      return JSON.parse(localState) as AuthState;
    }
    return initialState;
  }

}
