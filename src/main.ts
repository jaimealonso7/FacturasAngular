import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';  // Importa la configuración de Firebase y otros proveedores

// Arranca la aplicación con la configuración definida en appConfig
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

