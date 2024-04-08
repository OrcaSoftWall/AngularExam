import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Default to "not logged in"

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      this.loggedIn.next(!!user);
    });
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
