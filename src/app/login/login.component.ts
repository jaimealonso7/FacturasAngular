import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para las directivas de Angular como ngIf, ngFor
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',  // Asegúrate de que este selector coincida con lo que estás utilizando en el HTML
  imports: [RouterModule],
  standalone: true,  // Definimos que este es un componente Standalone
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {}
