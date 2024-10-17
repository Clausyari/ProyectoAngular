import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { User } from '../_model/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Por favor, complete los campos obligatorios.', 'error');
      return;
    }

    const user = new User(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value
    );

    this.authService.login(user).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        Swal.fire('Éxito', 'Inicio de sesión exitoso.', 'success');
        this.router.navigate(['/region']);  // Redirige a la página de regiones
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        Swal.fire('Error', 'Credenciales incorrectas.', 'error');
      }
    });
  }
}
