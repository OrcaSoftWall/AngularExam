import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Guest } from './models/guest.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  async register(
    email: string,
    password: string,
    name: string,
    attending: boolean,
    group: number,
    accomodation: string
  ) {
    {
      // const { email, password, name, attending, group, accomodation } = formData;
      try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(          email,          password        );
        const uid = userCredential.user?.uid;

        // Construct the guest object
        const guestData: Guest = {
          name,
          email,
          attending,
          group,
          accomodation,
        };

        if (uid) {
          // Store guest information in Firestore under a 'guests' collection
          await this.firestore.collection('guests').doc(uid).set(guestData);
        }
      } catch (error) {
        console.error('Registration error:', error);
        // Handle registration errors, e.g., email already in use
      }
      this.router.navigate(['/dashboard']);
    }
  }

  async login(email: string, password: string) {
    await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  getCurrentUserName(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore
            .collection('users')
            .doc(user.uid)
            .valueChanges()
            .pipe(map((profile: any) => profile?.userName || null));
        } else {
          return of(null);
        }
      })
    );
  }
}
