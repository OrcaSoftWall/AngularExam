// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   constructor(private afAuth: AngularFireAuth, private router: Router) {}

//   // Getter to check if the user is logged in
//   get isLogged(): boolean {
//     let logged = false;
//     this.afAuth.authState.subscribe(user => logged = !!user);
//     return logged;
//   }

//   // Logout method
//   logout(): void {
//     this.afAuth.signOut().then(() => {
//       this.router.navigate(['/']);
//     });
//   }
// }

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Default to not logged in

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.loggedIn.next(!!user);
    });
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
