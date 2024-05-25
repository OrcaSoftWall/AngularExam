// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { GuestBookEntry } from '../models/guest-book-entry.model';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class GuestBookService {
//   constructor(private firestore: AngularFirestore) {}

//   getEntries(): Observable<GuestBookEntry[]> {
//     return this.firestore.collection<GuestBookEntry>('guestBook', ref => ref.orderBy('timestamp', 'desc')).valueChanges({ idField: 'id' });
//   }

//   addEntry(entry: GuestBookEntry): Promise<void> {
//     const id = this.firestore.createId();
//     return this.firestore.collection('guestBook').doc(id).set(entry);
//   }

//   updateEntry(id: string, message: string): Promise<void> {
//     return this.firestore.collection('guestBook').doc(id).update({ message });
//   }

//   deleteEntry(id: string): Promise<void> {
//     return this.firestore.collection('guestBook').doc(id).delete();
//   }
// }


import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GuestBookEntry } from '../models/guest-book-entry.model';

@Injectable({
  providedIn: 'root'
})
export class GuestBookService {
  constructor(private firestore: AngularFirestore) {}

  getGuestBookEntries(): Observable<GuestBookEntry[]> {
    return this.firestore.collection<GuestBookEntry>('guestBookEntries', ref => ref.orderBy('timestamp', 'desc')).valueChanges({ idField: 'id' });
  }

  createGuestBookEntry(entry: GuestBookEntry): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('guestBookEntries').doc(id).set({ ...entry, id });
  }

  updateGuestBookEntry(id: string, text: string): Promise<void> {
    return this.firestore.collection('guestBookEntries').doc(id).update({ text });
  }

  deleteGuestBookEntry(id: string): Promise<void> {
    return this.firestore.collection('guestBookEntries').doc(id).delete();
  }
}
