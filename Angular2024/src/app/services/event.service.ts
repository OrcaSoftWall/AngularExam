import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from '../models/event.model'; // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private firestore: AngularFirestore) {}

  // Create a new event
  addEvent(event: Event) {
    return this.firestore.collection('events').add(event);
  }

  // Retrieve all events
  getEvents() {
    return this.firestore.collection('events').snapshotChanges();
  }

  // Update an event
  updateEvent(eventId: string, event: Event) {
    return this.firestore.doc(`events/${eventId}`).update(event);
  }

  // Delete an event
  deleteEvent(eventId: string) {
    return this.firestore.doc(`events/${eventId}`).delete();
  }
}
