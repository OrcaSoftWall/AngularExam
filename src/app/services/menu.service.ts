import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  getMenuItems(): Observable<MenuItem[]> {
    return this.firestore.collection<MenuItem>('menu', ref => ref.orderBy('orderOfServing')).valueChanges({ idField: 'id' });
  }

  addMenuItem(item: MenuItem): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`menu/${id}`).set(item);
  }

  updateMenuItem(id: string, data: Partial<MenuItem>): Promise<void> {
    return this.firestore.doc(`menu/${id}`).update(data);
  }

  deleteMenuItem(id: string): Promise<void> {
    return this.firestore.doc(`menu/${id}`).delete();
  }

  // updateLikes(id: string, increment: number): Promise<void> {
  //   // Use firestore transaction to safely increment likes
  //   return this.firestore.firestore.runTransaction(async transaction => {
  //     const docRef = this.firestore.firestore.doc(`menu/${id}`);
  //     const doc = await transaction.get(docRef);
  //     const newLikes = (doc.data()?.[`likes`] || 0) + increment;
  //     transaction.update(docRef, { likes: newLikes });
  //   });
  // }

  async toggleLike(id: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (!user) return Promise.reject('No user logged in');
    const userId = user.uid;

    const itemRef = this.firestore.doc<MenuItem>(`menu/${id}`);
    return this.firestore.firestore.runTransaction(async transaction => {
      const doc = await transaction.get(itemRef.ref);
      if (!doc.exists) return;

      const data = doc.data() as MenuItem;
      const likes = data.likes || 0;
      const likedBy = data.likedBy || [];

      if (likedBy.includes(userId)) {
        // Unlike
        transaction.update(itemRef.ref, {
          likes: likes - 1,
          likedBy: firebase.firestore.FieldValue.arrayRemove(userId)
        });
      } else {
        // Like
        transaction.update(itemRef.ref, {
          likes: likes + 1,
          likedBy: firebase.firestore.FieldValue.arrayUnion(userId)
        });
      }
    });
  }
}
