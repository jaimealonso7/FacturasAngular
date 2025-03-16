import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'environments/environment';
import { MAT_FORM_FIELD, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 🔹 Importación correcta


const NO_NG_MODULES = importProvidersFrom([BrowserAnimationsModule]);

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración de enrutamiento
    provideRouter(routes),

    NO_NG_MODULES,
    
    // Configuración de detección de cambios con zonas
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Inicialización de Firebase usando la configuración del archivo environment.ts
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // Configuración de autenticación
    provideAuth(() => getAuth()),

    // Configuración de Firestore
    provideFirestore(() => {
      const firestore = getFirestore();
      console.log('Firestore inicializado:', firestore);
      return firestore;
    }),

    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        color: 'accent'
      }
    }

  ]
};
