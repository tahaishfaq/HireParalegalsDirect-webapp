import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

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
    private toastr: ToastrService
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

    const { name, city } = this.searchForm.value;
    const apiUrl = `${environment.apiUrl}/lawyers/search?name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`;

    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        if (Array.isArray(response) && response.length > 0) {
          this.router.navigate(['/claim-profile-listing']);
        } else {
          this.apiErrorMessage = 'No profile found. Contact sales to create one.';
          this.toastr.warning(this.apiErrorMessage, 'Search Result');
          // this.isLoading = false;
        }
      },
      (error) => {
        // this.isLoading = false; // Stop loading on error
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
