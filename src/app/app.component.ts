/*import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'facturas';
}*/
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';  // Firebase
import { provideFirestore, Firestore, collection, getDocs, addDoc, getFirestore } from '@angular/fire/firestore';  // Firestore
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoginComponent,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'facturas';
  facturas: any[] = [];

  // Factura model
  factura = {
    numeroFactura: '',
    baseImponible: 0,
    iva: 21,
    total: 0,
    empresa: '',
    nif: '',
    direccion: '',
    fechaEmision: new Date(),
    errorMessage: ''
  };


  firestore = inject(Firestore);  // Inyección de Firestore
  zone = inject(NgZone);  // Inyección de NgZone

  constructor() {}

  // Método para calcular el total
  calcularTotal() {
    const baseImponible = this.factura.baseImponible;
    const iva = this.factura.iva;

    // Validar que la base imponible y el IVA sean números y mayores que cero
    if (baseImponible > 0 && iva >= 0) {
      this.factura.total = baseImponible + (baseImponible * iva / 100);
    } else {
      this.factura.total = 0;
    }
  }

  // Método para agregar una nueva factura
  agregarFactura(nuevaFactura: any) {
    const facturasCollection = collection(this.firestore, 'facturas');
    addDoc(facturasCollection, nuevaFactura)
      .then(() => console.log('Factura agregada'))
      .catch((error) => console.error('Error agregando factura:', error));
  }

  // Método para cargar las facturas desde Firestore
  ngOnInit(): void {
    const facturasCollection = collection(this.firestore, 'facturas');
    
    // Asegúrate de que las llamadas Firebase se ejecuten dentro del contexto de Angular (NgZone)
    this.zone.run(() => {
      getDocs(facturasCollection).then((querySnapshot) => {
        this.facturas = querySnapshot.docs.map(doc => doc.data());
      }).catch((error) => console.error('Error al obtener facturas:', error));
    });
  }
}
