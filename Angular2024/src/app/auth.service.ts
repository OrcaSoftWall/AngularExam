import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async register(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
  if (result.user) {
    await result.user.updateProfile({
      displayName: "Your Name", // Or any other name you gather during registration
      // photoURL: "https://example.com/photo.jpg"
    });
    console.log('User profile updated', result.user);
  }
  this.router.navigate(['/dashboard']);
  return result;
  }

  async login(email: string, password: string) {
    await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return await this.afAuth.signOut();
  }
}
