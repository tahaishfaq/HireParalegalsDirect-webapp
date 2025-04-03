import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import paralegalsData from '../../../../assets/data/paralegals.json';
import { SearchService } from 'app/shared/services/search.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-lawyer-listing',
  templateUrl: './lawyer-listing.component.html',
  styleUrls: ['./lawyer-listing.component.scss']
})
export class LawyerListingComponent implements OnInit {
  paralegals: any[] = [];
  isLoading: boolean = true;
  // isLoading: boolean = true;
  filteredParalegals: any[] = [];
  practice: string = '';
  location: string = '';
  searchResults: any[] = [];
  constructor(private router: Router, private searchService: SearchService, private http: HttpClient, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const state = history.state;

    if (state) {
      this.paralegals = state['searchResults'] || [];
      this.practice = state['practice'] || '';
      this.location = state['location'] || '';
    }

    this.isLoading = false;
  }
  filterParalegals(practice: string, location: string) {
    this.filteredParalegals = this.paralegals.filter(paralegal =>
      (practice ? paralegal.practice.toLowerCase().includes(practice.toLowerCase()) : true) &&
      (location ? paralegal.location.toLowerCase().includes(location.toLowerCase()) : true)
    );
  }
  viewParalegalProfile(paralegal: any) {
    this.router.navigate(['/paralegals-profile'], { state: { paralegal } });
  }
}
