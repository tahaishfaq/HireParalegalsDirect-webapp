import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private jsonUrl = 'assets/paralegals.json'; // Adjust the path as needed.

  constructor(private http: HttpClient) {}

  // Fetch all paralegals from the JSON file
  getParalegals(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
  searchParalegals(practice: string, location: string): Observable<any[]> {
    return this.getParalegals().pipe(
      map(paralegals =>
        paralegals.filter(paralegal => {
          const matchesPractice = practice
            ? Array.isArray(paralegal.practice) 
              ? paralegal.practice.some(p => p.toLowerCase().includes(practice.toLowerCase()))
              : paralegal.practice?.toLowerCase().includes(practice.toLowerCase())
            : true; // If practice is empty, allow all
  
          const matchesLocation = location
            ? Array.isArray(paralegal.location) 
              ? paralegal.location.some(l => l.toLowerCase().includes(location.toLowerCase()))
              : paralegal.location?.toLowerCase().includes(location.toLowerCase())
            : true; // If location is empty, allow all
  
          return matchesPractice && matchesLocation;
        })
      )
    );
  }
  
  
}
