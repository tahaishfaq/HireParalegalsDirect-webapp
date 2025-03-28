import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClaimProfileService {
  private searchResults: any = null;

  setSearchResults(results: any) {
    this.searchResults = results;
  }

  getSearchResults() {
    return this.searchResults;
  }

  clearSearchResults() {
    this.searchResults = null;
  }
}
