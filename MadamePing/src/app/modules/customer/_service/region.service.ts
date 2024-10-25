import { Injectable } from '@angular/core';
import { Region } from '../_model/region';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private source = "/region";

  constructor(private http: HttpClient) { }

  getRegions(): Observable<any>{
    return this.http.get(api_dwb_uri + this.source);
  }
}