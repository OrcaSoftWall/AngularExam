import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map, startWith } from 'rxjs/operators';
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

  currentUserDetails$: Observable<{
    name: string | null;
    email: string | null;
  }> = this.afAuth.authState.pipe(
    switchMap((user: firebase.User | null) => {
      if (!user || !user.email) {
        // If there's no user or user email, immediately return an observable of null values for name and email
        return of({ name: null, email: null });
      } else {
        const email = user.email; // Capture the user's email
        // Attempt to fetch the user's name from Firestore. Ensure the observable's type matches the expected output
        return this.firestore
          .collection('guests')
          .doc<Guest>(user.uid)
          .valueChanges()
          .pipe(
            map((guest: Guest | undefined) => {
              // Check if guest data exists and map it to the expected structure
              return {
                name: guest ? guest.name : null,
                email: email,
                role: guest ? guest.role : null,
              };
            }),
            startWith({ name: null, email: email }) // Provide an initial value in case the Firestore query takes time
          );
      }
    }),
    startWith({ name: null, email: null }) // Initial value in case authState hasn't emitted yet
  );

  async register(
    email: string,
    password: string,
    name: string,
    attending: boolean,
    group: number,
    accomodation: string,
    role: string
  ) {
    {
      // const { email, password, name, attending, group, accomodation } = formData;
      try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(
          email,
          password
        );
        const uid = userCredential.user?.uid;

        // Construct the guest object
        const guestData: Guest = {
          name,
          email,
          attending,
          group,
          accomodation,
          role,
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
          console.log('Fetching name for UID:', user.uid);
          return (
            this.firestore
              .collection('guests')
              .doc(user.uid)
              .valueChanges()
              // .pipe(map((profile: any) => profile?.name || null));
              .pipe(
                map((guest: any) => {
                  console.log('Fetched guest data:', guest);
                  return guest?.name || null;
                })
              )
          );
        } else {
          console.log('No user logged in');
          return of(null);
        }
      })
    );
  }

  currentUser$: Observable<firebase.User | null> = this.afAuth.authState;

  getCurrentUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(map((user) => (user ? user.uid : null)));
  }


  // Method to check if the current user is an administrator
  isAdministrator(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) {
          // Directly return an Observable of false if there's no user
          return of(false);
        }
        // Fetch the user details from Firestore
        return this.firestore.doc<{ role: string }>(`users/${user.uid}`).valueChanges().pipe(
          map(userDetails => {
            if (!userDetails) {
              return false; // Return false if no userDetails are found
            }
            // Check if the user's role is one of the designated admin roles
            return ['groom', 'bride', 'organizer'].includes(userDetails.role);
          })
        );
      })
    );
  }
}
