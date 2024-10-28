import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../_service/authentication.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LoginResponse } from '../../_model/login-response';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  showLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],  // Cambiado aquí
      password: ['', [Validators.required, Validators.minLength(6)]],  // Cambiado aquí
    });
  }

  ngOnInit(): void {}

  public onLogin(): void {
    this.submitted = true; // Asegúrate de que se marquen los campos como tocados

    if (this.loginForm.invalid) {
      return; // Evita continuar si hay errores
    }

    this.showLoading = true;
    const loginFormValue = this.loginForm.value as { username: string, password: string };

    this.authenticationService.login(loginFormValue).subscribe(
      (response: HttpResponse<LoginResponse>) => {
        if (response.body && response.body.token) {
          const token = response.body.token;
          this.authenticationService.saveToken(token); // Guarda el token usando el servicio
          this.authenticationService.addUserToLocalCache(response.body); // Almacena la respuesta del usuario en cache
          this.router.navigateByUrl('/secured'); // Redirige a la página asegurada
        } else {
          console.error('El token devuelto no fue poblado o la respuesta está vacía');
        }
        this.showLoading = false;
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
        } else if (errorResponse.status === 500) {
          this.errorMessage = 'Error del servidor. Inténtalo más tarde.';
        } else {
          this.errorMessage = 'Error en el login. Verifica tus credenciales.';
        }
        this.showLoading = false;
      }
    );
  } 
}