import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Guest } from '../models/guest.model';


@Injectable({
  providedIn: 'root',
})
export class GuestService {
  constructor(private firestore: AngularFirestore) {}

  getGuests(): Observable<Guest[]> {
      return this.firestore.collection<Guest>('guests', ref => ref.orderBy('role', 'desc')).valueChanges();
    //   return this.firestore.collection<Guest>('guests', ref => ref.orderBy('registrationTime', 'desc')).valueChanges();
  }

  getGuestById(id: string): Observable<Guest | undefined> {
    return this.firestore.doc<Guest>(`guests/${id}`).valueChanges();
  }

  // updateGuest(id: string, guestData: Guest): Promise<void> {
  //   return this.firestore.doc(`guests/${id}`).update(guestData);
  // }
  updateGuest(id: string, data: Partial<Guest>): Promise<void> {
    return this.firestore.doc<Guest>(`guests/${id}`).update(data);
  }
}
