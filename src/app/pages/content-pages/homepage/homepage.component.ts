import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LawyerService } from 'app/shared/services/lawyers.service';
import { SearchService } from 'app/shared/services/search.service';
import { JoinModalComponent } from '../join-modal/join-modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  isPlaying = false; // Tracks video state

  practice = '';
  location = '';
  
  constructor(private lawyerService: LawyerService, private router: Router, private searchService: SearchService,  private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  searchParalegals() {
    this.searchService.searchParalegals(this.practice, this.location).subscribe(results => {
      if (results.length > 0) {
        this.router.navigate(['/lawyers-list'], { state: { searchResults: results, practice: this.practice, 
          location: this.location  } });
      } else {
        alert('No results found.');
      }
    });
  }
  openJoinModal() {
    this.modalService.open(JoinModalComponent, {
      size: 'md',
      centered: true,
      scrollable: true // Allows modal body to be scrollable
    });
  }
  // searchLawyers() {

  //   this.router.navigate(['lawyers-list']);

  //   if (!this.query || !this.location) {
  //     alert('Please enter both fields'); 
  //     return;
  //   }

  //   this.lawyerService.searchLawyers(this.query, this.location).subscribe(
  //     (response) => {
  //       this.router.navigate(['/lawyers-list'], { state: { lawyers: response } });
  //     },
  //     (error) => {
  //       console.error('Error fetching lawyers:', error);
  //     }
  //   );
  // }


  playVideo() {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.play();
      this.isPlaying = true; // Hide overlay & icon
    }
  }

  pauseVideo() {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.pause();
      this.videoPlayer.nativeElement.currentTime = 0; // Reset to start
      this.isPlaying = false; // Show overlay & icon again
    }
  }
}
