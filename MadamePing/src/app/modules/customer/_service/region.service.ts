import { Injectable } from '@angular/core';
import { Region } from '../_model/region';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = api_dwb_uri;
  private source = "/region";

  constructor(private http: HttpClient) { }

  getRegions(): Observable<Region[]>{
    return this.http.get<Region[]>(this.apiUrl + this.source);
  }

  createRegion(region: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/regions`, region, { headers });
  }

  updateRegion(region: any, id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/regions/${id}`, region, { headers });
  }

  disableRegion(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/regions/${id}`, { headers });
  }

  enableRegion(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/regions/${id}/activate`, null, { headers });
  }
}