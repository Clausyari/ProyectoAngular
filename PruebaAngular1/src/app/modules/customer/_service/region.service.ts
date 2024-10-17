import { Injectable } from '@angular/core';
import { Region } from '../_model/region';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private source = "/region";

  constructor(private http: HttpClient) { }

  // Método para obtener las regiones, ya sea de la API o predeterminadas
  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(api_dwb_uri + this.source).pipe(
      catchError(error => {
        console.error('Error al obtener las regiones:', error);
        return of(this.getDefaultRegions());
      })
    );
  }

  // Método para agregar regiones predeterminadas
  private getDefaultRegions(): Region[] {
    let regions: Region[] = [];
    
    /*let region: Region = new Region(0, "Norte", "N", 1); regions.push(region);
    region = new Region(1, "Sur", "S", 1); regions.push(region);
    region = new Region(2, "Noreste", "NE", 0); regions.push(region);
    region = new Region(3, "Pacífico", "P", 0); regions.push(region);
    region = new Region(4, "Oeste", "O", 1); regions.push(region);
    region = new Region(5, "Sureste", "SE", 0); regions.push(region);

    return regions;*/
    return [
      new Region(0, "Norte", "N", 1),
      new Region(1, "Sur", "S", 1),
      new Region(2, "Noreste", "NE", 0),
      new Region(3, "Pacífico", "P", 0),
      new Region(4, "Oeste", "O", 1),
      new Region(5, "Sureste", "SE", 0)
    ];
  }

  addRegion(region: Region): Observable<any> {
    return this.http.post(api_dwb_uri + this.source, region).pipe(
      catchError(error => {
        console.error('Error al registrar la región:', error);
        return throwError(() => new Error('Error al registrar la región.'));
      })
    );
  }

  updateRegion(region: Region): Observable<any> {
    return this.http.put(`${api_dwb_uri + this.source}/${region.region_id}`, region).pipe(
      catchError(error => {
        console.error('Error al actualizar la región:', error);
        return throwError(() => new Error('Error al actualizar la región.'));
      })
    );
  }

  deleteRegion(region_id: number): Observable<any> {
    return this.http.delete(`${api_dwb_uri + this.source}/${region_id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar la región:', error);
        return throwError(() => new Error('Error al eliminar la región.'));
      })
    );
  }
}
