import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';  // Asegúrate de importar correctamente Firestore
import { NgZone } from '@angular/core';  // Importamos NgZone
import { FirestoreService } from './services/firestore.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'facturas';
  facturas: any[] = [];
  errorMessage = '';

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

  firestore = inject(Firestore);  // Inyectamos Firestore

  constructor(private firestoreService: FirestoreService) {}


  ngOnInit(): void {
    this.firestoreService.getData()
      .then((data) => {
        this.facturas = data;
      })
      .catch((error) => {
        console.error('Error obteniendo documentos:', error);
        this.errorMessage = 'Error al cargar las facturas.';
      });
  }

  calcularTotal() {
    const baseImponible = this.factura.baseImponible;
    const iva = this.factura.iva;

    if (baseImponible > 0 && iva >= 0) {
      this.factura.total = baseImponible + (baseImponible * iva / 100);
    } else {
      this.factura.total = 0;
    }
  }

  agregarFactura(nuevaFactura: any) {
    const facturasCollection = collection(this.firestore, 'facturas');
    addDoc(facturasCollection, nuevaFactura)
      .then(() => console.log('Factura agregada'))
      .catch((error) => {
        console.error('Error agregando factura:', error);
        this.factura.errorMessage = 'Error al agregar la factura. Intenta nuevamente.';
      });
  }
}
