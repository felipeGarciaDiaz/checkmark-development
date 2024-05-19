import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getSearchRequests(): Observable<any> {
    return this.http.get(`${this.url}/getCopyrights`, {}).pipe(
      map((data: any) => {
        console.log('Data:', data);
      }),
      catchError((error: any) => {
        console.error('Error getting search requests:', error);
        return of(undefined);
      })
    );
  }
}
