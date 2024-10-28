import { Routes } from '@angular/router';
import { RegionComponent } from './modules/customer/component/region/region.component';
import { LoginComponent } from './modules/authentication/component/login.component';
import { CustomerImageComponent } from './modules/commons/component/customer-image.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'region', component: RegionComponent, canActivate: [AuthGuard] },
  { path: 'customer-image', component: CustomerImageComponent, canActivate: [AuthGuard] }
];