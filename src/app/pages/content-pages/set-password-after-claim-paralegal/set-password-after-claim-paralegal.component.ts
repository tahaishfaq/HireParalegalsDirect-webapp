import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-password-after-claim-paralegal',
  templateUrl: './set-password-after-claim-paralegal.component.html',
  styleUrls: ['./set-password-after-claim-paralegal.component.scss']
})
export class SetPasswordAfterClaimParalegalComponent implements OnInit {
  email: string = '';
  password: string = '';
  token: string | null = null;
  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router) { }

    ngOnInit(): void {
      // Retrieve token from query params
      this.route.queryParams.subscribe(params => {
        this.token = params['token'];  // Get the token from the query param
  
        // Fetch the previously stored email from localStorage
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
          this.email = storedEmail; // Bind it to the email property
        }
      });
    }
    submitPassword(): void {
      if (!this.email || !this.password || !this.token) {
        this.toastr.warning('Please fill in all fields and ensure token is available.');
        return;
      }
  
      const payload = {
        email: this.email,
        newPassword: this.password
      };
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,  // Send token in the header
      });
  
      this.http.post(`${environment.apiUrl}/lawyers/set-password`, payload, { headers }).subscribe({
        next: (res: any) => {
          this.toastr.success(res?.message || 'Password set successfully!');
          localStorage.removeItem('userEmail');  // Remove the email from localStorage after success
          this.router.navigate(['/pages/homepage']);
        },
        error: (err) => {
          const errorMessage = err?.error?.message || 'Failed to set password.';
          this.toastr.error(errorMessage);
        }
      });
    }
}
