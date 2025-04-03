import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimProfileService } from '../claimProfile.service';

@Component({
  selector: 'app-claim-terms',
  templateUrl: './claim-terms.component.html',
  styleUrls: ['./claim-terms.component.scss']
})
export class ClaimTermsComponent implements OnInit {
  paralegal: any;
  constructor(private router: Router, private claimProfileService: ClaimProfileService) { }

  ngOnInit(): void {
    // Retrieve paralegal data from service
    this.paralegal = this.claimProfileService.getSelectedParalegal();
  }

  acceptTermsAndContinue() {
    if (this.paralegal && this.paralegal._id) {
      this.router.navigate(['/pages/claim-email'], { queryParams: { id: this.paralegal._id } });
    }
  }
}
