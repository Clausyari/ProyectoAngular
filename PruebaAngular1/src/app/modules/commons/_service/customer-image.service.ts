import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

@Injectable({
  providedIn: 'root'
})
export class CustomerImageService {
  private source = "/customer-image";
  //private baseUrl = 'http://localhost:8080';
  private baseUrl = api_dwb_uri; // Usar la misma URL si aplica


  constructor(private http: HttpClient) { }

   // Método para obtener los datos del cliente
   getCustomerData(): Observable<any> {
    return this.http.get(api_dwb_uri + this.source); // URL de la API para obtener los datos del cliente
    //return this.http.get(`${this.baseUrl}/customer-image`);

  }

  updateCustomerImage(customer_image: any): Observable<any> {
    return this.http.put(api_dwb_uri + this.source, customer_image);
  }
}
