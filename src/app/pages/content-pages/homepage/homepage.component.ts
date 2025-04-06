import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LawyerService } from 'app/shared/services/lawyers.service';
import { SearchService } from 'app/shared/services/search.service';
import { JoinModalComponent } from '../join-modal/join-modal.component';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  practice = '';
  location = '';
  
  constructor(private lawyerService: LawyerService, private route: ActivatedRoute,private toastr: ToastrService,     private http: HttpClient, private spinner: NgxSpinnerService,    private authService: AuthService,  private router: Router, private searchService: SearchService,  private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        console.log('Google Sign-in Token:', token);
        this.authService.storeGoogleAuthToken(token);
        this.router.navigate(['/pages/homepage']);
      }
    });
  
    // Only call getUserNameAndReload when user is on homepage
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/pages/homepage') {
        this.getUserNameAndReload();
      }
    });
  }
  

  getUserNameAndReload(): void {
    const authData = localStorage.getItem('auth');
    const token = authData ? JSON.parse(authData)?.access_token : null;
  
    if (!token) {
      console.warn('Token not found in localStorage.');
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${token}`
    };
  
    this.http.get(`${environment.apiUrl}/users/getUserFromToken`, { headers }).subscribe({
      next: (res: any) => {
        if (res?.user?.name) {
          localStorage.setItem('username', res.user.name);
          window.location.reload();
        } else {
          console.warn('User name not found in API response.');
        }
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Failed to fetch user information.';
        this.toastr.error(errorMessage);
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
