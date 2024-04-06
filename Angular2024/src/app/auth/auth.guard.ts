// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Router, UrlTree } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { map, take } from 'rxjs/operators';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService {
//   constructor(private afAuth: AngularFireAuth, private router: Router) {}

//   canActivate(): ( router: Router) => Observable<boolean | UrlTree> {
//     console.log("canActivate - active")
//     return ( router: Router) => {
// console.log("here")
//       return this.afAuth.authState.pipe(
//         take(1),
//         map(user => !!user || router.parseUrl('/login'))
//       );
//     };
//   }
// }


import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => !!user), // map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied')
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
