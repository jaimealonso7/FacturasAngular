import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './login/login.component';
import { ListaFacturaComponent } from './lista-facturas/lista-facturas.component';  // Corrige el nombre aquí
import SignUpComponent from './sign-up/sign-up.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LogInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'lista-facturas', component: ListaFacturaComponent },  // Corrige el nombre aquí
];


