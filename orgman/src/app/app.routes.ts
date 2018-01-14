import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardComponent} from './orgman/view/dashboard.component';
import {AddressComponent} from './orgman/view/address.component';
import {AddressDetailComponent} from './orgman/view/addressdetail.component';
import {CalendarComponent} from './orgman/view/calendar.component';
import {LoginComponent} from './orgman/view/login.component';
import {LoginRouteGuard} from './orgman/service/loginRouteGuard';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'login', component: LoginComponent},
    {path: 'address', component: AddressComponent},
    {path: 'address/:param', component: AddressDetailComponent},
    {path: 'calendar', component: CalendarComponent, canActivate: [LoginRouteGuard]}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
