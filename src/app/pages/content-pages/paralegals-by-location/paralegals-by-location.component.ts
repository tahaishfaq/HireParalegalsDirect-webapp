import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'app/shared/services/state.service';
import { Country, State, City }  from 'country-state-city';
@Component({
  selector: 'app-paralegals-by-location',
  templateUrl: './paralegals-by-location.component.html',
  styleUrls: ['./paralegals-by-location.component.scss']
})
export class ParalegalsByLocationComponent implements OnInit {
  stateName: string = '';
  paralegalCount: string = '';
  selectedState: any;
  cities: string[] = [];
  topCities: string[] = [];
  @ViewChild('topCities') topCitiess!: ElementRef;
  @ViewChild('allCities') allCities!: ElementRef;
  @ViewChild('allCounties') allCounties!: ElementRef;
  constructor(private route: ActivatedRoute, private stateService: StateService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.stateName = params['state'];
      this.paralegalCount = params['count'];
    });
    this.stateService.selectedState$.subscribe((state) => {
      if (state) {
        this.selectedState = state;
        this.getStateISOCode(state.name);
      }
    });
  }

  getStateISOCode(stateName: string) {
    const states = State.getStatesOfCountry('US');
    const matchedState = states.find(state => state.name.toLowerCase() === stateName.toLowerCase());

    if (matchedState) {
      this.fetchCities(matchedState.isoCode);
    } else {
      console.error('State ISO code not found');
    }
  }
  fetchCities(stateISO: string) {
    this.cities = City.getCitiesOfState('US', stateISO).map(city => city.name); // <-- Save all cities
    this.setTopCities();
  }

  // Select 4 to 8 cities
  setTopCities() {
    const minCities = 4;
    const maxCities = 8;
    this.topCities = this.cities.slice(0, Math.max(minCities, Math.min(maxCities, this.cities.length)));
  }
  scrollTotopCitiesSection(section: string) {
    this.topCitiess.nativeElement.scrollIntoView({ behavior: 'smooth' });
   
  }
  scrollToallCitiesSection(section: string) {
 
    this.allCities.nativeElement.scrollIntoView({ behavior: 'smooth' });
    
  }
  scrollToallCountiesSection(section: string) {

    this.allCounties.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}
