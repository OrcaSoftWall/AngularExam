import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Getter to check if the user is logged in
  get isLogged(): boolean {
    let logged = false;
    this.afAuth.authState.subscribe(user => logged = !!user);
    return logged;
  }

  // Logout method
  logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
