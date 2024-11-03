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

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl + this.source);
  }

  createRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(`${this.apiUrl}/regions`, region);
  }

  updateRegion(regionData: any, regionId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/regions/${regionId}`, regionData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  // Método para desactivar una región
  disableRegion(regionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/regions/${regionId}`);
  }

  // Método para habilitar una región (si es necesario)
  enableRegion(regionId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/regions/${regionId}/enable`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }  
}