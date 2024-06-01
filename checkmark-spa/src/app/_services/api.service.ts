import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICopyrightMain, ICopyrightResponse } from '../_models/copyrights';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url: string = environment.apiUrl;
  public csrfToken: any = null;
  public type: any = {
    general: '/general',
    maitenance: '/maitenance',
    checkmark: '/api'
  }
  constructor(private http: HttpClient) {

  }

  public setCSRFToken(): Observable<any> {
    return this.http.get<{ csrfToken: string }>(`${this.url}${this.type.general}/csrf-token`, { withCredentials: true }).pipe(
      map((data: any) => {
        console.log('CSRF Token:', data.csrfToken);
        this.csrfToken = data.csrfToken;
        return data;
      }),
      catchError((error: any) => {
        console.error('Error getting CSRF token:', error);
        return of(undefined);
      })
    );
  }

  public getCSRFToken(): string | null {
    return this.csrfToken;
  }
  
  public getSearchRequests(query: string): Observable<any> {

    const params = new HttpParams().set('copyright', query);
  
    return this.http.get(`${this.url + this.type.checkmark}/getCopyrights`, {
      params: params
    }).pipe(
      map((data: any) => {
        console.log('Data:', data);
        return data;
      }),
      catchError((error: any) => {
        console.error('Error getting search requests:', error);
        const reqError = {
          isSuccesful: false,
          message: 'Error getting search requests'
        }
        return of(undefined);
      })
    );
  }
}
