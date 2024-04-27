// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map, take, tap } from 'rxjs/operators';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanActivate {

//   constructor(private afAuth: AngularFireAuth, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return this.afAuth.authState.pipe(
//       take(1),
//       map(user => !!user), // map to boolean
//       tap(loggedIn => {
//         if (!loggedIn) {
//           console.log('access denied')
//           this.router.navigate(['/login']);
//         }
//       })
//     );
//   }
// }





// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { map, switchMap, take, tap } from 'rxjs/operators';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { User } from 'firebase/auth';
// import firebase from 'firebase/compat/app';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanActivate {
//   constructor(
//     private afAuth: AngularFireAuth, 
//     private firestore: AngularFirestore,
//     private router: Router
//   ) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> {
//     return this.afAuth.authState.pipe(
//       take(1),
//       switchMap((user: firebase.User | null) => {
//         if (!user) {
//           this.router.navigate(['/login']);
//           return of(false); // Ensure always returning an Observable
//         }
//         return this.firestore.collection('guests').doc(user.uid).valueChanges().pipe(
//           map((guest: any) => {
//             const isAdmin = ['groom', 'bride', 'organizer'].includes(guest?.role);
//             const allowedRoles = next.data['roles'] as string[];
//             if (isAdmin || (allowedRoles && allowedRoles.includes(guest?.role))) {
//               return true;
//             } else {
//               this.router.navigate(['/']);
//               return false;
//             }
//           })
//         );
//       })
//     );
//   }
// }



// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable, map, take, switchMap, of } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { User } from 'firebase/auth';
// import firebase from 'firebase/compat/app';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanActivate {
//   constructor(
//     private afAuth: AngularFireAuth,
//     private firestore: AngularFirestore,
//     private router: Router
//   ) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> {
//     return this.afAuth.authState.pipe(
//       take(1),
//       switchMap((user: firebase.User | null) => {
//         if (!user) {
//           console.log('Only logged in users can view');
//           this.router.navigate(['/login']);
//           return of(false);
//         }
//         return this.firestore.doc<any>(`users/${user.uid}`).valueChanges().pipe(
//           map(userDetails => {
//             const isAdmin = ['groom', 'bride', 'organizer'].includes(userDetails?.role);
//             const allowedRoles = next.data['roles'] as string[];
//             if (isAdmin || (allowedRoles && allowedRoles.includes(userDetails?.role))) {
//               return true;
//             } else {
//               console.log('Only authorised users can view');
//               this.router.navigate(['/']);
//               return false;
//             }
//           })
//         );
//       })
//     );
//   }
// }



import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, take, switchMap, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap((user) => {
        if (!user) {
          console.log('Only logged in users can view');
          this.router.navigate(['/login']);
          return of(false);
        }
        // Check if the route requires any specific roles
        const roles = next.data['roles'] as string[]; // Using bracket notation
        console.log("roles:", roles);
        if (!roles) {
          return of(true); // If no roles are required for the route, allow access.
        }
        return this.firestore.doc<any>(`guests/${user.uid}`).valueChanges().pipe(
          map(userDetails => {
            const isAdmin = ['groom', 'bride', 'organizer'].includes(userDetails?.role);
            if (isAdmin || (roles && roles.includes(userDetails?.role))) {
              return true;
            } else {
              console.log('Not authorized to access this page',userDetails?.role);
              this.router.navigate(['/']);
              return false;
            }
          })
        );
      })
    );
  }
}
