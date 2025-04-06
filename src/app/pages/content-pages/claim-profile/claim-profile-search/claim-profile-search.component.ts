import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { ClaimProfileService } from '../claimProfile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-claim-profile-search',
  templateUrl: './claim-profile-search.component.html',
  styleUrls: ['./claim-profile-search.component.scss']
})
export class ClaimProfileSearchComponent implements OnInit {
  searchForm!: FormGroup;
  submitted = false;
  paralegals: any[] = [];
  apiErrorMessage: string = '';
  // isLoading = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private claimProfileService: ClaimProfileService,
    private spinner: NgxSpinnerService
  ) {
    this.searchForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }
  get f() { return this.searchForm.controls; }

  onSearch() {
    this.submitted = true;
    this.apiErrorMessage = '';
  
    if (this.searchForm.invalid) {
      return;
    }
  
    // Start showing the spinner
    this.spinner.show();
  
    const { name, city } = this.searchForm.value;
    const apiUrl = `${environment.apiUrl}/lawyers/search?name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`;
  
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        // Stop spinner on success
        this.spinner.hide();
  
        if (response?.lawyers && Array.isArray(response.lawyers) && response.lawyers.length > 0) {
          const lawyerName = response.lawyers[0]?.user?.name || 'Unknown Lawyer';
          this.toastr.success(`Paralegal Found: ${lawyerName}`, 'Search Result');
  
          this.claimProfileService.setSearchResults(response.lawyers);
          this.router.navigate(['/pages/claim-profile-listing']);
        } else {
          this.apiErrorMessage = response?.message || 'No profile found. Contact sales to create one.';
          this.toastr.warning(this.apiErrorMessage, 'Search Result');
        }
      },
      (error) => {
        // Stop spinner on error
        this.spinner.hide();
  
        console.error('Search Error:', error);
        this.apiErrorMessage = error?.error?.message || 'Error while searching. Please try again.';
        this.toastr.error(this.apiErrorMessage, 'Error');
      }
    );
  }


  onClaimProfile() {
    alert('Claim Profile button clicked.');
  }

  onContactSale() {
    alert('Contact Sale button clicked.');
  }
}
