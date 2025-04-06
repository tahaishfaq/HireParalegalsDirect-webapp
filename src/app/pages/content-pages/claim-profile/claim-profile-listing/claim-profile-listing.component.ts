import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'app/shared/services/search.service';
import { ClaimProfileService } from '../claimProfile.service';

@Component({
  selector: 'app-claim-profile-listing',
  templateUrl: './claim-profile-listing.component.html',
  styleUrls: ['./claim-profile-listing.component.scss']
})
export class ClaimProfileListingComponent implements OnInit {
  paralegals: { city: string; practiceAreas: string[] }[] = [];

  isLoading: boolean = true;
  practice: string = '';
  location: string = '';
  searchResults: any[] = [];
  constructor(private router: Router, private searchService: SearchService, private http: HttpClient, private route: ActivatedRoute,  private claimProfileService: ClaimProfileService) { }
  ngOnInit(): void {
    // Try to get data from the service first
    this.searchResults = this.claimProfileService.getSearchResults() || [];

    if (this.searchResults.length > 0) {
      this.paralegals = this.searchResults;
      console.log("Received paralegals from search:", this.paralegals);

      // Store in localStorage
      localStorage.setItem('paralegals', JSON.stringify(this.paralegals));
    } else {
      // If no data in service, check localStorage
      const storedParalegals = localStorage.getItem('paralegals');
      if (storedParalegals) {
        this.paralegals = JSON.parse(storedParalegals);
        console.log("Loaded paralegals from localStorage:", this.paralegals);
      } else {
        console.log("No search results received, list is empty.");
      }
    }

    this.isLoading = false;
  }

  viewParalegalProfile(paralegal: any) {
    this.claimProfileService.setSelectedParalegal(paralegal);
    this.router.navigate(['/paralegals-profile'], { state: { paralegal } });
  }

  claimProfile(paralegal: any) {
    this.claimProfileService.setSelectedParalegal(paralegal); // Store selected paralegal data
    this.router.navigate(['/pages/claim-email'], { queryParams: { id: paralegal._id, email: paralegal.user.email } });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('paralegals');
  }
  
}
