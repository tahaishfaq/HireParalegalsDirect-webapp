import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { HomepageComponent } from './homepage/homepage.component';
import { LawyerListingComponent } from './lawyer-listing/lawyer-listing.component';
import { ParalegalsByLocationComponent } from './paralegals-by-location/paralegals-by-location.component';
import { ParalegalsByPracticeComponent } from './paralegals-by-practice/paralegals-by-practice.component';
import { ParalegalsProfileComponent } from './paralegals-profile/paralegals-profile.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ClaimProfileSearchComponent } from './claim-profile/claim-profile-search/claim-profile-search.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'comingsoon',
        component: ComingSoonPageComponent,
        data: {
          title: 'Coming Soon page'
        }
      },
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Forgot Password Page'
        }
      },   
      
      {
        path: 'lockscreen',
        component: LockScreenPageComponent,
        data: {
          title: 'Lock Screen page'
        }
      },   
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'maintenance',
        component: MaintenancePageComponent,
        data: {
          title: 'Maintenance Page'
        }
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'otp',
        component: VerifyOtpComponent,
        data: {
          title: 'otp'
        }
      },
      {
        path: 'homepage',
        component: HomepageComponent,
        data: {
          title: 'Home Page'
        }
      },
      {
        path: 'lawyers-list',
        component: LawyerListingComponent,
        data: {
          title: 'lawyers-list'
        }
      },
      {
        path: 'paralegals-by-location',
        component: ParalegalsByLocationComponent,
        data: {
          title: 'paralegals-by-location'
        }
      },
      {
        path: 'paralegals-by-practice',
        component: ParalegalsByPracticeComponent,
        data: {
          title: 'paralegals-by-practice'
        }
      },
      {
        path: 'paralegals-profile',
        component: ParalegalsProfileComponent,
        data: {
          title: 'paralegals-profile'
        }
      },
      {
        path: 'claim-paralegal',
        component: ClaimProfileSearchComponent,
        data: {
          title: 'claim-paralegal'
        }
      }   
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
