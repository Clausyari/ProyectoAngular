import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { User } from '../_model/user';
import { LoginResponse } from '../_model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string | null;
  private loggedInUsername: string | null;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { 
    this.token = '';
    this.loggedInUsername = '';
  }

  public login(credenciales: {username?: string, password?: string}): Observable<HttpResponse<LoginResponse>> {
    console.log("Intentando login con credenciales:", credenciales);
    return this.http.post<LoginResponse>(`${api_dwb_uri}/login`, credenciales, { observe: 'response' });
  }

  public register(user: User): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${api_dwb_uri}/user`, user);
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');    
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(loginResponse: LoginResponse): void {
    localStorage.setItem('user', JSON.stringify(loginResponse));
  }

  public getUserFromLocalCache(): User | null {
    let usuarioCache = localStorage.getItem('user');
    if (usuarioCache !== null) {
      return JSON.parse(usuarioCache);
    }
    return null;
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
    console.log("Token cargado del localStorage:", this.token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }  

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token && this.token !== '') {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      console.log('Token decodificado:', decodedToken);
      if (decodedToken.username && !this.jwtHelper.isTokenExpired(this.token)) {
        this.loggedInUsername = decodedToken.username;
        return true;
      }
    }
    this.logOut();
    return false;
  }  
}