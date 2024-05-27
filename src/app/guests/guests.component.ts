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


// import { Component, OnInit } from '@angular/core';
// import { Observable, combineLatest } from 'rxjs';
// import { map, switchMap } from 'rxjs/operators';
// import { Guest } from '../models/guest.model';
// import { GuestService } from '../services/guest.service';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-guests',
//   templateUrl: './guests.component.html',
//   styleUrls: ['./guests.component.css'],
// })
// export class GuestsComponent implements OnInit {
//   guests$: Observable<Guest[]> | undefined;
//   currentUser$: Observable<string | null>;

//   constructor(private guestService: GuestService, private authService: AuthService) {
//     this.currentUser$ = this.authService.getCurrentUserName();
//   }

//   ngOnInit(): void {
//     this.guests$ = combineLatest([
//       this.guestService.getGuests(),
//       this.currentUser$
//     ]).pipe(
//       map(([guests, currentUserName]) => {
//         const currentUserProfile = guests.find(guest => guest.name === currentUserName);
//         const otherGuests = guests.filter(guest => guest.name !== currentUserName);
//         if (currentUserProfile) {
//           return [currentUserProfile, ...otherGuests];  // Put the current user's profile first
//         }
//         return guests;
//       })
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Guest } from '../models/guest.model';
import { GuestService } from '../services/guest.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],
})
export class GuestsComponent implements OnInit {
  guests$: Observable<Guest[]>| undefined;

  constructor(
    private guestService: GuestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe(id => {
      console.log("Current user ID:", id);
    });
  
    this.guests$ = this.authService.getCurrentUserId().pipe(
      // switchMap(userId => this.guestService.getGuests().pipe(
        switchMap(userId => this.guestService.getNonBrideGroomGuests().pipe(
        map(guests => {
          const currentUser = guests.find(guest => guest.id === userId);
          const otherGuests = guests.filter(guest => guest.id !== userId);
          console.log("current and other users:   ", currentUser, otherGuests)
          return currentUser ? [currentUser, ...otherGuests] : guests;
        })
      ))
    );
  }
}


// import { Component, OnInit } from '@angular/core';
// import { Observable, combineLatest } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Guest } from '../models/guest.model';
// import { GuestService } from '../services/guest.service';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-guests',
//   templateUrl: './guests.component.html',
//   styleUrls: ['./guests.component.css'],
// })
// export class GuestsComponent implements OnInit {
//   guests$: Observable<Guest[]> | undefined;
//   currentUserId$: Observable<string | null>;

//   constructor(private guestService: GuestService, private authService: AuthService) {
//     this.currentUserId$ = this.authService.getCurrentUserId();  // Get current user's UID
//   }

//   ngOnInit(): void {
//     this.guests$ = combineLatest([
//       this.guestService.getGuests(),
//       this.currentUserId$
//     ]).pipe(
//       map(([guests, currentUserId]) => {
//         const currentUserProfile = guests.find(guest => guest.id === currentUserId); // Find current user by UID
//         const otherGuests = guests.filter(guest => guest.id !== currentUserId);
//         return currentUserProfile ? [currentUserProfile, ...otherGuests] : guests;  // Place current user at top
//       })
//     );
//   }
// }


