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
  }
}
