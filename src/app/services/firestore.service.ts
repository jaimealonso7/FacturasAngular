import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(Firestore); // Inyecta Firestore correctamente

  async getData(): Promise<any[]> {
    const collectionRef = collection(this.firestore, 'facturas');
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}
