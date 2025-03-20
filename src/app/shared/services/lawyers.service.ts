import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LawyerService {
  private apiUrl = 'https://your-api-url.com/search'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  searchLawyers(query: string, location: string): Observable<any> {
    const body = { query, location };
    return this.http.post<any>(this.apiUrl, body);
  }
}
