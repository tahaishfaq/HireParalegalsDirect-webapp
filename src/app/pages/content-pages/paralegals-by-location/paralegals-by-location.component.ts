import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paralegals-by-location',
  templateUrl: './paralegals-by-location.component.html',
  styleUrls: ['./paralegals-by-location.component.scss']
})
export class ParalegalsByLocationComponent implements OnInit {
  stateName: string = '';
  paralegalCount: string = '';
  @ViewChild('topCities') topCities!: ElementRef;
  @ViewChild('allCities') allCities!: ElementRef;
  @ViewChild('allCounties') allCounties!: ElementRef;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.stateName = params['state'];
      this.paralegalCount = params['count'];
    });
  }

  scrollTotopCitiesSection(section: string) {
    this.topCities.nativeElement.scrollIntoView({ behavior: 'smooth' });
   
  }
  scrollToallCitiesSection(section: string) {
 
    this.allCities.nativeElement.scrollIntoView({ behavior: 'smooth' });
    
  }
  scrollToallCountiesSection(section: string) {

    this.allCounties.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}
