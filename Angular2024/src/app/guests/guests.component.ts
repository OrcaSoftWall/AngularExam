import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest } from '../models/guest.model';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css'],

})
export class GuestsComponent implements OnInit {
  guests$: Observable<Guest[]> | undefined;

  constructor(private guestService: GuestService) {}

  ngOnInit(): void {
    this.guests$ = this.guestService.getGuests();
  }
}

