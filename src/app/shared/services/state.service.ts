import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private selectedStateSource = new BehaviorSubject<any>(null);
  selectedState$ = this.selectedStateSource.asObservable();

  setSelectedState(state: any) {
    this.selectedStateSource.next(state);
  }
}
