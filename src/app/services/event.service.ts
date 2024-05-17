import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from '../models/event.model';
import { Comment } from '../models/comment.model';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private firestore: AngularFirestore) {}

  // Create a new event
  addEvent(event: Event) {
    return this.firestore.collection('events').add(event);
  }

  getEvents() {
    return this.firestore
      .collection<Event>('events')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Event;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getEventById(id: string) {
    return this.firestore.collection('events').doc<Event>(id).valueChanges();
  }

  updateEvent(eventId: string, event: Event) {
    return this.firestore.doc(`events/${eventId}`).update(event);
  }

  deleteEvent(eventId: string) {
    return this.firestore.doc(`events/${eventId}`).delete();
  }

  addComment(eventId: string, comment: Comment) {
    return this.firestore
      .collection('events')
      .doc(eventId)
      .collection('comments')
      .add({
        ...comment,
        timestamp: new Date(), 
      });
  }

  updateCommentText(eventId: string, commentId: string, newText: string): Promise<void> {
    return this.firestore.doc(`events/${eventId}/comments/${commentId}`).update({text: newText});
  }
  // updateCommentText(eventId: string, commentId: string, newText: string): Promise<void> {
  //   // Correct path to the specific comment document
  //   const commentDocPath = `events/${eventId}/comments/${commentId}`;
  
  //   // Attempt to update the 'text' field of the specified comment
  //   return this.firestore.doc(commentDocPath).update({ text: newText });
  // }

  getComments(eventId: string) {
    return this.firestore
      .collection('events')
      .doc(eventId)
      .collection<Comment>('comments', (ref) =>
        ref.orderBy('timestamp', 'desc')
      )
      .valueChanges({ idField: 'id' });
  }

  deleteComment(eventId: string, commentId: string) {
    return this.firestore
      .collection('events')
      .doc(eventId)
      .collection('comments')
      .doc(commentId)
      .delete();
  }


  convertTimestampToDate(timestamp: firebase.firestore.Timestamp | Date): Date {
    if (timestamp instanceof firebase.firestore.Timestamp) {
      return timestamp.toDate();
    }
    return timestamp;
  }
}
