import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-claim-token',
  templateUrl: './verify-claim-token.component.html',
  styleUrls: ['./verify-claim-token.component.scss']
})
export class VerifyClaimTokenComponent implements OnInit {
  token: string | null = null;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService) { }

    ngOnInit(): void {
      // Get token from route param
      this.token = this.route.snapshot.paramMap.get('token');
  
      if (this.token) {
        this.verifyClaimToken(this.token);
      }
    }
  
    verifyClaimToken(token: string) {
      const url = `${environment.apiUrl}/lawyers/set-password`;
    
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    
      this.http.post(url, {}, { headers }).subscribe({
        next: (res: any) => {
          if (res?.message === 'Verification successful. You can now set your password.') {
            this.toastr.success(res.message, 'Success');
            
            // Passing token as query parameter while navigating to set-new-password route
            this.router.navigate(['/pages/set-new-password'], {
              queryParams: { token: token }
            });
          } else {
            this.toastr.error('Unexpected response.', 'Error');
            this.router.navigate(['/pages/homepage']);
          }
        },
        error: (err) => {
          const errorMessage = err?.error?.message || 'Invalid or expired token';
          this.toastr.error(errorMessage, 'Error');
          this.router.navigate(['/pages/set-new-password'], {
            queryParams: { token: token }
          });
        }
      });
    }
    

}
