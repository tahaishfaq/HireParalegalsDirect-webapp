import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LawyerService } from 'app/shared/services/lawyers.service';
import { SearchService } from 'app/shared/services/search.service';
import { JoinModalComponent } from '../join-modal/join-modal.component';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  practice = '';
  location = '';
  
  constructor(private lawyerService: LawyerService, private route: ActivatedRoute,  private spinner: NgxSpinnerService,    private authService: AuthService,  private router: Router, private searchService: SearchService,  private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        console.log('Google Sign-in Token:', token);
        this.authService.storeGoogleAuthToken(token);
        this.router.navigate(['/pages/homepage']); // Redirect after storing token
      }
    });
  }
  searchParalegals() {
    if (!this.practice || !this.location) {
      alert('Please enter both practice area and location.');
      return;
    }

    this.spinner.show(); // Show spinner before API call

    this.searchService.searchParalegalss(this.practice, this.location).subscribe(
      results => {
        this.spinner.hide(); // Hide spinner after fetching data
        if (results.length > 0) {
          this.router.navigate(['/lawyers-list'], {
            state: {
              searchResults: results,
              practice: this.practice,
              location: this.location
            }
          });
        } else {
          this.spinner.hide();
          alert('No results found.');
        }
      },
      error => {
        this.spinner.hide();
        console.error('Error fetching search results:', error);
        alert('An error occurred while searching. Please try again later.');
      }
    );
  }
  openJoinModal() {
    this.modalService.open(JoinModalComponent, {
      size: 'md',
      centered: true,
      scrollable: true // Allows modal body to be scrollable
    });
  }
}
