import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
// import { DashboardService } from 'app/dashboardServices/dashboard.service';
// import { InMemoryDataService } from 'app/dashboardServices/in-memory-data.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { pluck, take } from 'rxjs/operators';
export interface Items {
  id: number;
  text: string;
  path?: string;
  icon?: string;
  selected?: boolean;
  separator?: undefined;
  component?: undefined;
  parentId?: number;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;
  shopid$: Observable<string>;
  userId$: Observable<any>;
  actualshop$: Observable<any>;
  actualshops: string;
  shop_id: string;
  user_id: string;
  role: string;
  role$: Observable<any>;
  usergroup: string;
  usergroup$: Observable<any>;
  responseMessage: string;
  Items: Items[] = [];
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],

  });

  constructor(private router: Router, private auth: AuthService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    // private inMemoryDataService: InMemoryDataService,
    // private dashboardService: DashboardService,
     public toastr: ToastrService,
    private route: ActivatedRoute) {
    this.shopid$ = this.auth.auth$.pipe(pluck('shopid'));
    this.shopid$.subscribe(event => this.shop_id = event);
    this.userId$ = this.auth.auth$.pipe(pluck('userId'));
    this.userId$.subscribe(event => this.user_id = event);
    this.actualshop$ = this.auth.auth$.pipe(pluck('acutalshop'));
    this.actualshop$.subscribe(event => this.actualshops = event);
    this.role$ = this.auth.auth$.pipe(pluck('role'));
    this.role$.subscribe((event) => (this.role = event));
    this.usergroup$ = this.auth.auth$.pipe(pluck('usergroupid'));
    this.usergroup$.subscribe((event) => (this.usergroup = event));
  }

  get lf() {
    return this.form.controls;
  }

  // On submit button click
  // onSubmit() {
  //   this.loginFormSubmitted = true;
  //   if (this.form.invalid) {
  //     return;
  //   }

  //   this.spinner.show(undefined,
  //     {
  //       type: 'ball-triangle-path',
  //       size: 'medium',
  //       bdColor: 'rgba(0, 0, 0, 0.8)',
  //       color: '#fff',
  //       fullScreen: true
  //     });

  //   this.auth.signinUser(this.form.value.username, this.form.value.password)
  //     .then((res) => {
  //       this.spinner.hide();
  //       this.router.navigate(['/sales-kpi-dashboard']);
  //     })
  //     .catch((err) => {
  //       this.isLoginFailed = true;
  //       this.spinner.hide();
  //       console.log('error: ' + err)
  //     }
  //     );
  // }
  // submit(): void {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     return;
  //   }
  
  //   this.spinner.show(undefined, {
  //     type: 'ball-triangle-path',
  //     size: 'medium',
  //     bdColor: 'rgba(0, 0, 0, 0.8)',
  //     color: '#fff',
  //     fullScreen: true
  //   });
  
  //   this.auth
  //     .login(this.form.value)
  //     .pipe(take(1))
  //     .subscribe(
  //       value => {
  //         this.spinner.hide();
  //         if (value.status === "Success") {
  //           this.router.navigateByUrl('/sales-kpi-dashboard').then();
  //         this.toastr.success("Login Successful");
  //         } else {
  //           this.toastr.error(value.status, 'Login Failed');
  //         }
  //       },
  //       error => {
  //         this.spinner.hide();
  //         if (error instanceof HttpErrorResponse) {
  //           if (error.status === 401 || typeof error.error.message === 'string') {
  //             this.toastr.error(
  //               error.error.message || 'Unauthorized access',
  //               'Error'
  //             );
  //           } else {
  //             this.toastr.error('Something went wrong. Please try again.', 'Error');
  //           }
  //         }
  //       }
  //     );
  // }
  

}
