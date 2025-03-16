import { inject, Injectable } from "@angular/core";
import { Auth, authState } from "@angular/fire/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { Firestore, doc, setDoc } from '@angular/fire/firestore'; // Importamos Firestore

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore); // Inyectamos Firestore

  // Esta propiedad expone el estado de autenticación
  readonly authState$ = authState(this.auth);

  // Método para obtener el usuario autenticado
  getUser() {
    const user = this.auth.currentUser; // Obtener el usuario autenticado
    console.log(user);
    return user;
  }

  // Registro de usuario
  signUpWithEmailAndPassword(credential: Credential, names: string, lastName: string): Promise<UserCredential> {
    console.log('Intentando registrar usuario:', credential.email);
    return createUserWithEmailAndPassword(
      this.auth, 
      credential.email, 
      credential.password
    ).then(async (userCredential) => {
      console.log('Usuario creado exitosamente en Firebase Auth:', userCredential.user);
      // Después de crear el usuario, almacenamos los datos adicionales en Firestore
      await this.saveUserToFirestore(userCredential.user.uid, names, lastName, credential.email);
      // Devolver el userCredential para que la función tenga el tipo correcto
      return userCredential;
    }).catch((error) => {
      console.error('Error al crear el usuario con Firebase Auth', error);
      throw error; // Lanzamos el error para que sea manejado por el componente
    });
  }

  // Guardamos los datos del usuario en Firestore
  private async saveUserToFirestore(uid: string, names: string, lastName: string, email: string): Promise<void> {
    console.log('Guardando usuario en Firestore con UID:', uid);
    try {
      const userDocRef = doc(this.firestore, 'users', uid); // Documento en Firestore con UID
      await setDoc(userDocRef, {
        uid,
        names,
        lastName,
        email,
        createdAt: new Date(),
        lastAccess: new Date()
      });
      console.log('Usuario guardado en Firestore exitosamente');
    } catch (error) {
      console.error('Error al guardar el usuario en Firestore', error);
    }
  }

  // Ingreso de usuario
  logInWithEmailAndPassword(credentials: { email: string; password: string }): Promise<void> {
    return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
      .then(() => {
        console.log('Usuario autenticado correctamente');
      })
      .catch((error) => {
        console.error('Error en el inicio de sesión en AuthService:', error); // Log dentro del servicio
        throw error; // Asegúrate de que el error sea lanzado
      });
  }
  
}
