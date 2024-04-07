// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Injectable } from '@angular/core';
// import firebase from 'firebase/compat/app';
// import { Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   currentUserId$: Observable<string | null>;
//   constructor(private afAuth: AngularFireAuth, private router: Router) {
//     this.currentUserId$ = this.afAuth.authState.pipe(
//       switchMap((user) => {
//         // If user is logged in, return the UID, otherwise return null
//         return of(user?.uid || null);
//       })
//     );
//   }

//   async register(email: string, password: string) {
//     const result = await this.afAuth.createUserWithEmailAndPassword(
//       email,
//       password
//     );
//     if (result.user) {
//       await result.user.updateProfile({
//         displayName: '1',
//         // photoURL: "https://example.com/photo.jpg"
//       });
//       console.log('User profile registered: ', result.user);
//     }
//     this.router.navigate(['/dashboard']);
//     return result;
//   }

//   async login(email: string, password: string) {
//     await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
//     return await this.afAuth.signInWithEmailAndPassword(email, password);
//   }

//   async logout() {
//     await this.afAuth.signOut();
//     this.router.navigate(['/login']);
//   }
// }

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // currentUserId$: Observable<string | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    // this.currentUserId$ = this.afAuth.authState.pipe(
    //   switchMap((user) => {
    //     // If user is logged in, return the UID, otherwise return null
    //     return of(user?.uid || null);
    //   })
    // );
  }

  async register(email: string, password: string, userName: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (result.user) {
      const userRef = this.firestore.collection('users').doc(result.user.uid);
      await userRef.set({
        userName: userName,
        // other profile information as needed
      });
      console.log('User profile registered: ', result.user);
    }
    this.router.navigate(['/dashboard']);
    return result;
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
