import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from './_service/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Agregar el token en el encabezado de autorización si está presente
    let authReq = req;
    if (token) {
      console.log("Token añadido a la solicitud:", token);
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Manejar la solicitud y la respuesta
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.log('Sesión expirada o no autorizada');
          this.authService.logOut(); 
          this.router.navigate(['/login']); 
        }
        return throwError(() => error); 
      })
    );
  }
}