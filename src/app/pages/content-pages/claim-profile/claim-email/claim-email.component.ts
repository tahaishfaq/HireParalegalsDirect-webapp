import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimProfileService } from '../claimProfile.service';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-claim-email',
  templateUrl: './claim-email.component.html',
  styleUrls: ['./claim-email.component.scss']
})
export class ClaimEmailComponent implements OnInit {
  lawyerId: string = '';
  email: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef,    private toastr: ToastrService, private claimProfileService: ClaimProfileService,     private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.lawyerId = params['id'];
      this.email = params['email'];
      if (!this.email) {
        const selectedParalegal = this.claimProfileService.getSelectedParalegal();
        if (selectedParalegal) {
          this.email = selectedParalegal.email;
        }
      }
      if (this.email) {
        localStorage.setItem('userEmail', this.email);
      }
      this.cdr.detectChanges();
    });
  }
  submitEmail() {
    const apiUrl = `${environment.apiUrl}/lawyers/claim-profile/${this.lawyerId}`;
    const payload = { email: this.email };
    this.spinner.show();
  
    this.http.post(apiUrl, payload).subscribe(
      (response: any) => {
        const message = response?.message || 'Email submitted successfully. Please check your inbox.';
        this.toastr.success(message, 'Success');
        this.spinner.hide();
        console.log('Email submitted successfully:', response);
        this.router.navigate(['/pages/homepage']);
      },
      (error) => {
        const errorMessage = error?.error?.message || 'Incorrect Email Address';
        this.toastr.error(errorMessage, 'Error');
        console.error('Error submitting email:', error);
        this.spinner.hide();
        this.router.navigate(['/pages/homepage']);
      }
    );
  }
  
}
