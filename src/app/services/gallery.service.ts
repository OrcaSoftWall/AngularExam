import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GalleryPhoto } from '../models/gallery-photo.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  getPhotos(): Observable<GalleryPhoto[]> {
    return this.firestore.collection<GalleryPhoto>('gallery', ref => ref.orderBy('timestamp', 'desc')).valueChanges({ idField: 'id' });
  }

  addPhoto(photo: GalleryPhoto): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`gallery/${id}`).set({
      ...photo,
      id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  async toggleLike(photoId: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (!user) return Promise.reject('No user logged in');
    const userId = user.uid;

    const photoRef = this.firestore.doc<GalleryPhoto>(`gallery/${photoId}`);
    return this.firestore.firestore.runTransaction(async transaction => {
      const doc = await transaction.get(photoRef.ref);
      if (!doc.exists) return;

      const data = doc.data() as GalleryPhoto;
      const likes = data.likes || 0;
      const likedBy = data.likedBy || [];

      if (likedBy.includes(userId)) {
        transaction.update(photoRef.ref, {
          likes: likes - 1,
          likedBy: firebase.firestore.FieldValue.arrayRemove(userId)
        });
      } else {
        transaction.update(photoRef.ref, {
          likes: likes + 1,
          likedBy: firebase.firestore.FieldValue.arrayUnion(userId)
        });
      }
    });
  }

//   async addComment(photoId: string, comment: string): Promise<void> {
//     const user = await this.afAuth.currentUser;
//     if (!user) return Promise.reject('No user logged in');
//     const userId = user.uid;

//     const commentData = {
//       author: user.displayName || 'Anonymous',
//       text: comment,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp()
//     };

//     const photoRef = this.firestore.doc(`gallery/${photoId}`);
//     return this.firestore.firestore.runTransaction(async transaction => {
//       const doc = await transaction.get(photoRef.ref);
//       if (!doc.exists) return;

//       const data = doc.data() as GalleryPhoto;
//       const comments = data.comments || [];

//       comments.push(commentData);
//       transaction.update(photoRef.ref, { comments });
//     });
//   }

addComment(photoId: string, comment: { authorId: string; text: string; timestamp: Date }): Promise<void> {
    const photoRef = this.firestore.doc(`gallery/${photoId}`);
    return this.firestore.firestore.runTransaction(async transaction => {
      const doc = await transaction.get(photoRef.ref);
      if (!doc.exists) throw 'Document does not exist!';

      const data = doc.data() as GalleryPhoto;
      const comments = data.comments || [];

      transaction.update(photoRef.ref, {
        comments: [...comments, comment],
      });
    });
  }

}
