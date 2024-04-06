import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): ( router: Router) => Observable<boolean | UrlTree> {
    console.log("canActivate - active")
    return ( router: Router) => {
console.log("here")
      return this.afAuth.authState.pipe(
        take(1),
        map(user => !!user || router.parseUrl('/login'))
      );
    };
  }
}
