import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'environments/environment';

// Importar la configuración desde environment.ts

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración de enrutamiento
    provideRouter(routes),
    
    // Configuración de detección de cambios con zonas
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Inicialización de Firebase usando la configuración del archivo environment.ts
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // Configuración de autenticación
    provideAuth(() => getAuth()),

    // Configuración de Firestore
    provideFirestore(() => getFirestore())
  ]
};
