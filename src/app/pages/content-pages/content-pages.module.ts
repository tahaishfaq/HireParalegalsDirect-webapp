import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from 'app/shared/shared.module';
import { LawyerListingComponent } from './lawyer-listing/lawyer-listing.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { JoinModalComponent } from './join-modal/join-modal.component';
import { ParalegalsByLocationComponent } from './paralegals-by-location/paralegals-by-location.component';
import { ParalegalsByPracticeComponent } from './paralegals-by-practice/paralegals-by-practice.component';
import { ParalegalsProfileComponent } from './paralegals-profile/paralegals-profile.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ClaimProfileSearchComponent } from './claim-profile/claim-profile-search/claim-profile-search.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    CommonModule,
    ContentPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgApexchartsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxSpinnerModule
  ],
  declarations: [
    ComingSoonPageComponent,
    ErrorPageComponent,
    ForgotPasswordPageComponent,
    LockScreenPageComponent,
    LoginPageComponent,
    MaintenancePageComponent,
    RegisterPageComponent,
    HomepageComponent,
    LawyerListingComponent,
    LoginModalComponent,
    JoinModalComponent,
    ParalegalsByLocationComponent,
    ParalegalsByPracticeComponent,
    ParalegalsProfileComponent,
    VerifyOtpComponent,
    ClaimProfileSearchComponent
  ]
})
export class ContentPagesModule { }
