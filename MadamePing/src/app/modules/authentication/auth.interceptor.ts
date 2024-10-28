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
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Manejar la solicitud y la respuesta
    return next.handle(authReq).pipe(
      catchError((error) => {
        // Verificar si el error es de autenticación (por ejemplo, 401)
        if (error.status === 401) {
          console.log('Sesión expirada o no autorizada');
          this.authService.logOut(); // Cerrar sesión automáticamente
          this.router.navigate(['/login']); // Redirigir al login
        }
        return throwError(() => error); // Propagar el error para que el componente lo maneje
      })
    );
  }
}