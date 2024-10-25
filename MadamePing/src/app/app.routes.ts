import { Routes } from '@angular/router';
import { RegionComponent } from './modules/customer/component/region/region.component'

export const routes: Routes = [
    { path: '', redirectTo: '/region', pathMatch: 'full' },
    {path: "region", component: RegionComponent},
    { path: '**', redirectTo: '/region' }
];