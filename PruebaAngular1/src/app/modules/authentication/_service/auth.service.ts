import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_model/user.model';
import { Token } from '../_model/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';  // Cambia a localhost

  constructor(private http: HttpClient) {}

  private users = [
    { username: 'admin', password: 'admin', token: 'token1' },
    { username: 'usuario2', password: 'contraseña2', token: 'token2' }
  ];

  login(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, user);
  }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
