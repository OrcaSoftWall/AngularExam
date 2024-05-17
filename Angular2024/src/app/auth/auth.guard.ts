import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import {
  Observable,
  map,
  take,
  switchMap,
  of,
  catchError,
  startWith,
} from 'rxjs'; // Make sure catchError is imported
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
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
      switchMap(user => {
        if (!user) {
          console.log('Access Denied: No user logged in.');
          console.log('Only logged in users can view');
          this.router.navigate(['/login']);
          return of(false);
        }
        // Check if the route requires any specific roles
        const roles = next.data['roles'] as string[]; // Using bracket notation
        console.log('Roles required for route:', roles);

        // Fetch the user details from Firestore
        return this.firestore
          .doc<{ role?: string }>(`guests/${user.uid}`)
          .valueChanges()
          .pipe(
            map(userDetails => {
              const userRole = userDetails?.role || ""; // Provide a default empty string if role is undefined
              console.log('User role from Firestore:', userRole);

              // const isAdmin = userRole ? ['groom', 'bride', 'organizer'].includes(userRole) : false;
              const isAdmin = ['groom', 'bride', 'organizer'].includes(userRole);
              console.log('Is user an admin:', isAdmin);

              if (isAdmin || (roles && userRole && roles.includes(userRole))) {
                // if (isAdmin) {
                console.log("isAdmin || (roles && userRole && roles.includes(userRole)):", isAdmin || (roles && userRole && roles.includes(userRole)))
                return true;
              } else {
                console.log('Not authorized to access this page, user role:', userRole);
                this.router.navigate(['/']);
                return false;
              }
            }),
            catchError(err => {
              console.error('Error fetching user details:', err);
              this.router.navigate(['/']);
              return of(false);
            }),
            // startWith(false) // Handle cases where the valueChanges might not emit immediately
          );
      })
    );
  }
}
