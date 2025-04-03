import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimProfileService {
  private selectedParalegalSubject = new BehaviorSubject<any>(null);
selectedParalegal$ = this.selectedParalegalSubject.asObservable();
  private searchResults: any = null;

  setSearchResults(results: any) {
    this.searchResults = results;
  }

  getSearchResults() {
    return this.searchResults;
  }

  setSelectedParalegal(paralegal: any) {
    this.selectedParalegalSubject.next(paralegal);
}

getSelectedParalegal() {
  return this.selectedParalegalSubject.value;
}

  clearSearchResults() {
    this.searchResults = null;
  }
}
