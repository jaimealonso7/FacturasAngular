import { Component, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'app/services/auth.service';

interface LogInForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent {

  hide = true;

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);  // Inyectamos el servicio de autenticación con el tipo correcto
  ngZone = inject(NgZone); // Inyectamos NgZone para controlar el ciclo de vida de Angular

  // Inicialización del formulario
  form: FormGroup<LogInForm> = this.formBuilder.group({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),  // FormControl de tipo string

    password: new FormControl<string>('', [
      Validators.required
    ]),  // FormControl de tipo string
  });

  // Método para manejar el login
  logIn(): void {
    console.log('logIn() fue llamado');
    if (this.form.invalid) {
      console.error('Formulario inválido:', {
        formGroupErrors: this.form.errors,
        emailErrors: this.form.get('email')?.errors,
        passwordErrors: this.form.get('password')?.errors,
      });
      return;
    }
  
    const { email, password } = this.form.value;
  
    if (!email || !password) {
      console.error('Email o contraseña no válidos:', { email, password });
      return;
    }
  
    console.log('Intentando iniciar sesión con:', { email, password });
  
    this.authService.logInWithEmailAndPassword({ email, password })
      .then(() => {
        console.log('Inicio de sesión exitoso');
        this.ngZone.run(() => {
          this.router.navigate(['/lista-facturas']);
        });
      })
      .catch((error) => {
        console.error('Error en el inicio de sesión (Componente):', error);
        let errorMessage = 'Error de autenticación. Por favor, verifica tus credenciales.';
  
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No se encontró una cuenta con este correo electrónico.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'La contraseña ingresada es incorrecta.';
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Demasiados intentos fallidos. Por favor, intenta más tarde.';
        }
  
        alert(errorMessage);
      });
  }
  
}