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

  // Retrieve all events
  // getEvents() {
  //   return this.firestore.collection('events').snapshotChanges();
  // }
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

  //get single event
  getEventById(id: string) {
    return this.firestore.collection('events').doc<Event>(id).valueChanges();
  }

  // Update an event
  updateEvent(eventId: string, event: Event) {
    return this.firestore.doc(`events/${eventId}`).update(event);
  }

  // Delete an event
  deleteEvent(eventId: string) {
    return this.firestore.doc(`events/${eventId}`).delete();
  }

  // Method to add a comment to an event
  addComment(eventId: string, comment: Comment) {
    return this.firestore
      .collection('events')
      .doc(eventId)
      .collection('comments')
      .add({
        ...comment,
        timestamp: new Date(), // Set timestamp server-side if possible
      });
  }

  // Method to fetch comments for an event
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
