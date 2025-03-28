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
    this.searchResults = this.claimProfileService.getSearchResults() || [];
  if (this.searchResults.length > 0) {
    this.paralegals = this.searchResults;
    console.log("Received paralegals from search:", this.paralegals);
  } else {
    console.log("No search results received, list is empty.");
  }
    this.isLoading = false;
  }
  // filterParalegals(practice: string, location: string) {
  //   this.filteredParalegals = this.paralegals.filter(paralegal =>
  //     (practice ? paralegal.practice.toLowerCase().includes(practice.toLowerCase()) : true) &&
  //     (location ? paralegal.location.toLowerCase().includes(location.toLowerCase()) : true)
  //   );
  // }
  viewParalegalProfile(paralegal: any) {
    this.router.navigate(['/paralegals-profile'], { state: { paralegal } });
  }
}
