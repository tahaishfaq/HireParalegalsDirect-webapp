import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient,    private toastr: ToastrService, private claimProfileService: ClaimProfileService,     private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.lawyerId = params['id'];
      const selectedParalegal = this.claimProfileService.getSelectedParalegal();
      if (selectedParalegal) {
        this.email = selectedParalegal.email; // Autofill email
      }
    });
  }
  submitEmail() {
    const apiUrl = `${environment.apiUrl}/lawyers/claim-profile/${this.lawyerId}`;
    const payload = { email: this.email };
    this.spinner.show();
    this.http.post(apiUrl, payload).subscribe(
      response => {
        this.toastr.success('Email submitted successfully, Please check your inbox');
        this.spinner.hide();
        console.log('Email submitted successfully:', response);
        this.router.navigate(['/pages/homepage']);
      },
      error => {
        this.toastr.success('Incorrect Email Address');
        console.error('Error submitting email:', error);
        this.spinner.hide();
        this.router.navigate(['/pages/homepage']);
      }
    );
  }
}
