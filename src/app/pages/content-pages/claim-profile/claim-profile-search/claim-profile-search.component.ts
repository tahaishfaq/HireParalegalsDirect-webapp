import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-claim-profile-search',
  templateUrl: './claim-profile-search.component.html',
  styleUrls: ['./claim-profile-search.component.scss']
})
export class ClaimProfileSearchComponent implements OnInit {
  searchForm: FormGroup;
  submitted = false;
  paralegals: any[] = [];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
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

    if (this.searchForm.invalid) {
      return;
    }

    const { name, city } = this.searchForm.value;
    const apiUrl = `${environment.apiUrl}/lawyers/search?name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`;

    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.paralegals = response; // Store the response array
        if (this.paralegals.length > 0) {
          this.router.navigate(['/claim-profile-listing']);
        } else {
          alert('No matching profile found.');
        }
      },
      (error) => {
        console.error('Search Error:', error);
        alert('Error while searching. Please try again.');
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
