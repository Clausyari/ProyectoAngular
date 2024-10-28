import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_service/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../_model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showLoading: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      address: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]], // Validación de correo
      name: ['', [Validators.required, Validators.minLength(2)]], // Mínimo 2 caracteres
      password: ['', [Validators.required, Validators.minLength(6)]],
      region_id: [1, Validators.required],
      rfc: ['', Validators.required],
      rol_id: [1, Validators.required],
      surname: ['', [Validators.required, Validators.minLength(2)]], // Mínimo 2 caracteres
      username: ['', [Validators.required, Validators.minLength(3)]]
    });    
  }

  ngOnInit(): void {}

  public onRegister(): void {
    this.showLoading = true;
    if (this.registerForm.invalid) {
      this.showLoading = false; // Detén el loader si hay errores
      return; // Evita continuar si hay errores
    }
    const newUser: User = this.registerForm.value;

    this.authenticationService.register(newUser).subscribe(
      (response) => {
        alert(response.message); // Muestra mensaje de éxito
        this.router.navigateByUrl('/login'); // Redirige a la página de login
        this.showLoading = false;
      },
      (errorResponse: HttpErrorResponse) => {
        alert(errorResponse.error.message); // Muestra mensaje de error
        this.showLoading = false;
      }
    );
  }
}