import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import Factura from '../interfaces/facturas.interfaz';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private firestore: Firestore) { }

  addFacturas(factura: Factura) {
    const facturaRef = collection(this.firestore, 'facturas');
    return addDoc(facturaRef, factura).then((docRef) => {
      console.log('Factura agregada con ID:', docRef.id);
    });
  }

  getFacturas(): Observable<Factura[]> {
    const facturaRef = collection(this.firestore, 'facturas');
    return collectionData(facturaRef, { idField: 'id' }) as Observable<Factura[]>;
  }

  deleteFactura(id: string) {
    if (!id) {
      return Promise.reject('Error: ID vacío o inválido.');
    }
    const facturaDocRef = doc(this.firestore, `facturas/${id}`);
    return deleteDoc(facturaDocRef);
  }

  updateFactura(factura: any) {
    const facturaDocRef = doc(this.firestore, `facturas/${factura.id}`);
    return updateDoc(facturaDocRef, factura);
  }
}
