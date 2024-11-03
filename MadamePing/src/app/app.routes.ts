import { Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/component/login/login.component';
import { RegionComponent } from './modules/customer/component/region/region.component';
import { RegisterComponent } from './modules/authentication/component/register/register.component';
import { SecuredComponent } from './modules/authentication/component/secured/secured.component';
import { authenticationGuard } from './modules/authentication/authentication.guard';

export const routes: Routes = [
  // Ruta para el login
  { path: 'login', component: LoginComponent },

  // Ruta protegida para el componente Region
  { path: 'region', component: RegionComponent, canActivate: [authenticationGuard] },

  { path: 'register', component: RegisterComponent },
  { path: 'secured', component: SecuredComponent, canActivate: [authenticationGuard] },

  // Redirección por defecto al login si no se especifica una ruta válida
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }  // Cualquier otra ruta redirige al login
];