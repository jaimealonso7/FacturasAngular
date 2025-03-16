import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterModule } from "@angular/router";
import { AuthService, Credential } from "app/services/auth.service";
import { CommonModule } from "@angular/common";

interface SignUpForm {
    names: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
}

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterModule, CommonModule], // Import MatDialogModule
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    providers: []
  })

export default class SignUpComponent {
    hide = true;

    formBuilder = inject(FormBuilder);

    form: FormGroup<SignUpForm> = this.formBuilder.group({
      names: this.formBuilder.control('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      lastName: this.formBuilder.control('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      email: this.formBuilder.control('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      password: this.formBuilder.control('', {
        validators: Validators.required,
        nonNullable: true,
      }),



    });

    private authService = inject(AuthService);
    private router = inject(Router);

    getErrorMessage(controlName: string): string {
      const control = this.form.get(controlName);

      if (control?.hasError('required')) {
          return 'Este campo es obligatorio.';
      }
      if (control?.hasError('email')) {
          return 'Introduce un email válido.';
      }
      if (control?.hasError('minlength')) {
          return `El campo debe tener al menos ${control.getError('minlength').requiredLength} caracteres.`;
      }
      return '';
  }

    get isEmailValid(): string | boolean {
      const control = this.form.get('email');

      const isInvalid = control?.invalid && control.touched;

      if(isInvalid) {
        return control.hasError('required')
          ? 'This field is required'
          : 'Enter a valid email';
      }

      return false;

    }

    async signUp(): Promise<void> {
      try {
        // Validación del formulario
        if (this.form.invalid) {
          console.error('Formulario inválido. Detalles:', {
            namesErrors: this.form.get('names')?.errors,
            lastNameErrors: this.form.get('lastName')?.errors,
            emailErrors: this.form.get('email')?.errors,
            passwordErrors: this.form.get('password')?.errors,
          });
    
          // Lanzar un error para detener el flujo
          throw new Error('El formulario tiene errores y no se puede continuar.');
        }
    
        // Preparar las credenciales de usuario
        const credential: Credential = {
          email: this.form.value.email || '',
          password: this.form.value.password || '',
        };
    
        const names = this.form.value.names || '';
        const lastName = this.form.value.lastName || '';
    
        console.log('Intentando registrar usuario con:', credential, names, lastName);
    
        // Registrar usuario a través del servicio de autenticación
        await this.authService.signUpWithEmailAndPassword(credential, names, lastName);
    
        console.log('Usuario registrado con éxito. Redirigiendo...');
        this.router.navigateByUrl('/lista-facturas');
      } catch (error) {
        console.error('Error en el proceso de registro:', error);
    
        let errorMessage = 'Hubo un problema al intentar registrar al usuario.';
    
        if (error instanceof Error) {
          if (error.message.includes('auth/email-already-in-use')) {
            errorMessage = 'El correo electrónico ya está en uso.';
          } else if (error.message.includes('auth/weak-password')) {
            errorMessage = 'La contraseña es demasiado débil. Por favor, usa una contraseña más segura.';
          }
        }
    
        alert(errorMessage); // Mostrar un mensaje de error amigable al usuario
      }
    }
    
    
    
}