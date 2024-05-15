// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Guest } from '../models/guest.model';
// import { GuestService } from '../services/guest.service';

// @Component({
//   selector: 'app-guests',
//   templateUrl: './guests.component.html',
//   styleUrls: ['./guests.component.css'],

// })
// export class GuestsComponent implements OnInit {
//   guests$: Observable<Guest[]> | undefined;

//   constructor(private guestService: GuestService) {}

//   ngOnInit(): void {
//     this.guests$ = this.guestService.getGuests();
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guest } from '../models/guest.model';
import { GuestService } from '../services/guest.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],
})
export class GuestsComponent implements OnInit {
  guests$: Observable<Guest[]> | undefined;
  currentUser$: Observable<string | null>;

  constructor(private guestService: GuestService, private authService: AuthService) {
    this.currentUser$ = this.authService.getCurrentUserName();
  }

  ngOnInit(): void {
    this.guests$ = combineLatest([
      this.guestService.getGuests(),
      this.currentUser$
    ]).pipe(
      map(([guests, currentUserName]) => {
        const currentUserProfile = guests.find(guest => guest.name === currentUserName);
        const otherGuests = guests.filter(guest => guest.name !== currentUserName);
        if (currentUserProfile) {
          return [currentUserProfile, ...otherGuests];  // Put the current user's profile first
        }
        return guests;
      })
    );
  }
}

